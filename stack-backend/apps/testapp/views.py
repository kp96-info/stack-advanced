import json

from django.conf import settings
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.views.generic import TemplateView
from rest_framework.generics import CreateAPIView
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.testapp.forms import SignUpForm, LoginForm
from apps.testapp.serializers import StackSearchSerializer, SignUpSerializer
from apps.testapp.throttles import PostRateThrottle, GetRateThrottle
from apps.testapp.utils import call_stackoverflow_advance


class SignUpView(TemplateView):
    template_name = 'signup.html'

    def get_context_data(self, **kwargs):
        return {'signup_form': SignUpForm()}

    def post(self, request, *args, **kwargs):
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/')
        else:
            return self.render_to_response({'signup_form': form})


class SignUpAPIView(CreateAPIView):
    serializer_class = SignUpSerializer


class LoginView(TemplateView):
    template_name = 'login.html'

    def get_context_data(self, **kwargs):
        return {'login_form': LoginForm()}

    def post(self, request, *args, **kwargs):
        req = request.POST
        username = req['username']
        password = req['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return HttpResponseRedirect('/')
        else:
            messages.error(request, 'Username or Password in incorrect')
            return self.render_to_response(self.get_context_data(**kwargs))


class StackSearchView(LoginRequiredMixin, APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'index.html'
    login_url = 'login'

    throttle_classes = [PostRateThrottle, GetRateThrottle]

    def get(self, request):
        return Response({'search_form': StackSearchSerializer()})

    def post(self, request, *args, **kwargs):
        serializer = StackSearchSerializer(data=request.data)
        if settings.STACK_SEARCH_THROTTLE_STATUS:
            if not serializer.is_valid():
                return Response({'search_form': serializer, 'response': serializer.errors})
            response = call_stackoverflow_advance(serializer.data)
            pretty_json = json.loads(response.text)
            response = json.dumps(pretty_json, indent=10)
            return Response({'search_form': StackSearchSerializer(data=request.data), 'response': response})
        else:
            return Response({'search_form': StackSearchSerializer(data=request.data),
                             'response': {'error': 'you have reached your limit'}})

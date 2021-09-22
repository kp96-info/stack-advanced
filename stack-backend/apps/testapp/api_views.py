from django.conf import settings
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response

from apps.testapp.serializers import SignUpSerializer, StackSearchSerializer
from apps.testapp.throttles import PostRateThrottle, GetRateThrottle
from apps.testapp.utils import call_stackoverflow_advance


class SignUpAPIView(CreateAPIView):
    serializer_class = SignUpSerializer


class LoginAPIView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })


class StackSearchAPIView(RetrieveAPIView):
    serializer_class = StackSearchSerializer
    throttle_classes = [PostRateThrottle, GetRateThrottle]

    def get(self, request, *args, **kwargs):

        self.request.query_params.urlencode()
        serializer = StackSearchSerializer(data=request.data)
        if settings.STACK_SEARCH_THROTTLE_STATUS:
            if not serializer.is_valid():
                return Response({'search_form': serializer, 'response': serializer.errors})
            response = call_stackoverflow_advance(serializer.data).json()
            return Response({ 'response': response})
        else:
            return Response({'error': 'you have reached your limit'})

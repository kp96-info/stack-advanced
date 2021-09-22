from django.contrib import admin
from django.urls import path, include

from apps.testapp.views import SignUpView, LoginView, StackSearchView, SignUpAPIView
from apps.testapp.api_views import LoginAPIView,StackSearchAPIView

api_urls = [
    path('signup', SignUpAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('search',StackSearchAPIView.as_view())
]

urlpatterns = [
    path('signup/', SignUpView.as_view()),
    path('login/', LoginView.as_view(), name='login'),
    path('', StackSearchView.as_view()),
    path('api/', include(api_urls))
]

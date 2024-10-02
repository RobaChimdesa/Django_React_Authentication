from django.urls import path # type: ignore
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView # type: ignore

urlpatterns=[
    path("register/",UserRegistrationAPIView.as_view(),name="registration_user"),
    path("login/",UserLoginAPIView.as_view(),name="login_user"),
    path("logout/",UserLogoutAPIView.as_view(),name="logout"),
    path("token/refresh/",TokenRefreshView.as_view(),name="token_refresh"),
    path("user/",UserInfoAPView.as_view(),name="user_info")
]
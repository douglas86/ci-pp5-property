from django.urls import path, include

from .views import LogoutView, ChangePasswordView

urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("", include("dj_rest_auth.urls"), name="login"),
    path("logout/", LogoutView.as_view(), name="logout" ),
    path("registration/", include("dj_rest_auth.registration.urls"), name="registration"),
    path("change_password/", ChangePasswordView.as_view({'post': 'retrieve'}), name="change_password"),
]
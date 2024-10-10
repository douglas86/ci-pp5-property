from django.urls import path, include

urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("", include("dj_rest_auth.urls")), # Login
    path("registration/", include("dj_rest_auth.registration.urls")), # Registration
]
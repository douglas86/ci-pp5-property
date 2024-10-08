"""
URL configuration for property project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views. Home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os

from django.contrib import admin
from django.urls import path, include, re_path
from django.shortcuts import render
from .settings import BASE_DIR

from .views import HomeView

def render_react(request):
    path_to_manifest = os.path.join(BASE_DIR, 'build/manifest.json')
    with open(path_to_manifest) as f:
        return render(request, 'index.html', content_type='application/json')

urlpatterns = [
    path("api/", HomeView.as_view({'get': 'list'}), name="home"),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]

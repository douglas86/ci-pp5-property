from django.urls import path
from .views import CreatePropertyView

urlpatterns = [
    path('create/', CreatePropertyView.as_view(), name='property_create'),
]
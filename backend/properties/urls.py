from django.urls import path
from .views import CreatePropertyView, ReadPropertyView

urlpatterns = [
    path('create/', CreatePropertyView.as_view(), name='property_create'),
    path('read/', ReadPropertyView.as_view(), name='property_read'),
]
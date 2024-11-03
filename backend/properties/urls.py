from django.urls import path
from .views import CreatePropertyView, ReadPropertyView, DeletePropertyView

urlpatterns = [
    path('create/', CreatePropertyView.as_view(), name='property_create'),
    path('read/', ReadPropertyView.as_view(), name='property_read'),
    path('delete/<int:pk>/', DeletePropertyView.as_view(), name='property_delete'),
]
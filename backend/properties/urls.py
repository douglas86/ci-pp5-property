from django.urls import path
from .views import CreatePropertyView, ReadPropertyView, DeletePropertyView, UpdatePropertyView

urlpatterns = [
    path('create/', CreatePropertyView.as_view(), name='property_create'),
    path('read/', ReadPropertyView.as_view(), name='property_read'),
    path('update/<int:pk>/', UpdatePropertyView.as_view(), name='property_update'),
    path('delete/<int:pk>/', DeletePropertyView.as_view(), name='property_delete'),
]
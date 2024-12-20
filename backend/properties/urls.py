from django.urls import path
from .views import CreatePropertyView, PropertyByIDView, ReadPropertyView, DeletePropertyView, UpdatePropertyView, FilterPropertyView

urlpatterns = [
    path('create/', CreatePropertyView.as_view(), name='property_create'),
    path('<int:pk>/', PropertyByIDView.as_view(), name='property_by_id'),
    path('read/', ReadPropertyView.as_view(), name='property_read'),
    path('filter/', FilterPropertyView.as_view(), name='property_filter'),
    path('update/<int:pk>/', UpdatePropertyView.as_view(), name='property_update'),
    path('delete/<int:pk>/', DeletePropertyView.as_view(), name='property_delete'),
]
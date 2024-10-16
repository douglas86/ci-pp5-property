from django.urls import path

from .views import DeleteUserByUsername

urlpatterns = [
    path('delete_user/', DeleteUserByUsername.as_view({'post': 'delete'}), name='delete_user'),
]

from django.urls import path

from .views import MyProfileView, ProfileView, ProfileDeleteView, ProfileUpdateView

urlpatterns = [
    path('me/', MyProfileView.as_view({'get': 'retrieve'}), name='my_profile'),
    path('delete/<int:pk>/', ProfileDeleteView.as_view({'delete': 'destroy'}), name='delete_profile'),
    path('update/<int:pk>/', ProfileUpdateView.as_view({'put': 'update'}), name='update_profile'),
    path('', ProfileView.as_view({'get': 'retrieve'}), name='all_profiles'),
]

from django.urls import path

from .views import ProfileByIdView, MyProfileView, ProfileView

urlpatterns = [
    path('me/', MyProfileView.as_view({'get': 'retrieve'}), name='my_profile'),
    path('<int:pk>/', ProfileByIdView.as_view({'get': 'retrieve'}), name='profile'),
    path('', ProfileView.as_view({'get': 'retrieve'}), name='all_profiles'),
]

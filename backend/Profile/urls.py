from django.urls import path

from .views import ProfileByIdView, MyProfileView

urlpatterns = [
    path('me/', MyProfileView.as_view({'get': 'retrieve'}), name='my_profile'),
    path('<int:pk>/', ProfileByIdView.as_view({'get': 'retrieve'}), name='profile'),
]

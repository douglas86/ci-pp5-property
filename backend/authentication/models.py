from django.db import models
from django.db.models.signals import post_save
from rest_framework.authtoken.admin import User


# Create your models here.
class Authentication(models.Model):
    """
    Authentication model is used to store user information
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='images/', default='../default_profile_rkmhff')
    address = models.CharField(max_length=120, default=None)
    area_code = models.CharField(max_length=120, default=None)
    rent = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    role = models.CharField(max_length=50, default='user')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{str(self.user)}'s Profile"

def create_user_profile(sender, instance, created, **kwargs):
    """
    Creates new user profile once a User object is created
    :param sender:
    :param instance:
    :param created:
    :param kwargs:
    :return:
    """

    if created:
        Authentication.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)

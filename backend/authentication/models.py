from django.db import models
from django.db.models.signals import post_save
from rest_framework.authtoken.admin import User
from cloudinary.models import CloudinaryField

from properties.models import Property


# Create your models here.
class Authentication(models.Model):
    """
    Authentication model is used to store user information
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = CloudinaryField('images', default='default_profile_rkmhff')
    role = models.CharField(max_length=50, default='user')
    property = models.OneToOneField(Property, on_delete=models.CASCADE, null=True, blank=True)
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

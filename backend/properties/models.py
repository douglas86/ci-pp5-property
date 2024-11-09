from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class Property(models.Model):
    """
    Create a new property model
    """

    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=255, blank=False, null=False)
    address = models.CharField(max_length=120, default='None', blank=False, null=False)
    area_code = models.CharField(max_length=120, default='None')
    image = CloudinaryField('images', max_length=10000, default='default_post_r8m7an')
    is_sold = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{str(self.user)}'s Profile"

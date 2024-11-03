import base64
import binascii

import cloudinary
from cloudinary.uploader import upload
from django.core.files.base import ContentFile
from rest_framework import serializers

from properties.models import Property


class PropertySerializer(serializers.ModelSerializer):
    """
    Serializer for a Property model
    """

    image = serializers.CharField(required=False)

    class Meta:
        model = Property
        fields = ['id', 'price', 'description', 'address', 'area_code', 'image', 'created_at', 'updated_at']

        # check if image is base64 string
    def is_base64(self, data):
        # take data:image out of base64 string
        if data.startswith('data:image'):
            data = data.split(',')[1]

        try:
            # decode data after striped base64
            decoded_data = base64.b64decode(data, validate=True)
            encoded_data = base64.b64encode(decoded_data).decode('utf-8')
            return encoded_data == data.strip()
        # catch errors specific to improper base64 encoded, such as malformed data
        except (binascii.Error, ValueError):
            return False

    def handle_image_upload(self, image_data):
        """
        Handle image upload to Cloudinary if image is base64 encoded
        """

        if image_data and self.is_base64(image_data):
            formatted, image_string = image_data.split('base64,')
            ext = formatted.split('/')[-1]
            decoded_image = base64.b64decode(image_string)

            upload_image = cloudinary.uploader.upload(
                ContentFile(decoded_image, name=f'image.{ext}'),
                folder="property"
            )
            return upload_image['url']
        return None

    def create(self, validated_data):
        """
        Create a new property instance, handling base64 image upload
        """

        image_data = validated_data.pop('image', None)

        if image_data:
            validated_data['image'] = self.handle_image_upload(image_data)
        return Property.objects.create(**validated_data)

    # def create(self, validated_data):
    #
    #     image_data = validated_data.get('image', None)
    #
    #     if image_data and self.is_base64(image_data):
    #         formatted, image_string = image_data.split(';base64,')
    #         ext = formatted.split(',')[-1]
    #         decoded_image = base64.b64decode(image_string)
    #
    #         upload_result = cloudinary.uploader.upload(
    #             ContentFile(decoded_image, name=f'image.{ext}'),
    #             folder="property",
    #         )
    #
    #         validated_data['image'] = upload_result['url']
    #
    #     property_instance = Property.objects.create(**validated_data)
    #
    #     return property_instance

    def update(self, instance, validated_data):
        """
        Update a property instance, handling base64 image upload
        """

        image_data = validated_data.pop("image", None)

        if image_data:
            validated_data['image'] = self.handle_image_upload(image_data)
        return super().update(instance, validated_data)

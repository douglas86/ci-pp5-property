import base64

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
        fields = ['id', 'price', 'description', 'address', 'area_code', 'image']

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
        except binascii.Error:
            return False
        # catch error handle cases like incorrect padding or other formatting issues in the input string
        except ValueError:
            return False

    def create(self, validated_data):

        image_data = validated_data.get('image', None)

        if image_data and self.is_base64(image_data):
            formatted, image_string = image_data.split(';base64,')
            ext = formatted.split(',')[-1]
            decoded_image = base64.b64decode(image_string)

            upload_result = cloudinary.uploader.upload(
                ContentFile(decoded_image, name=f'image.{ext}'),
                folder="property",
            )

            validated_data['image'] = upload_result['url']

        property_instance = Property.objects.create(**validated_data)

        return property_instance

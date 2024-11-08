import base64
import binascii

import cloudinary
from django.core.checks import database

from django.core.files.base import ContentFile

from adrf.serializers import Serializer
from rest_framework import serializers
from cloudinary.utils import cloudinary_url

from authentication.models import Authentication


class ProfileSerializer(Serializer):
    """
    Serializer for Profile model
    """

    id = serializers.SerializerMethodField()
    user = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.id')
    profile_picture = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    property = serializers.SerializerMethodField()
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()

    def get_property(self, obj):
        return obj.property

    def get_id(self, obj):
        return obj.user.id

    def get_profile_picture(self, obj):
        """
        Get Profile URL from a database
        :param obj:
        :return:
        """

        if obj.profile_picture:
            return obj.profile_picture.url
        return None

    def get_role(self, obj):
        """
        Returns the role of a user if it is a superuser or not
        :param obj:
        :return:
        """

        if obj.user.is_superuser:
            return "admin"
        else:
            return obj.role


class ProfileUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer to update profile model
    """

    profile_picture = serializers.CharField(required=False)

    class Meta:
        model = Authentication
        fields = ['profile_picture', 'address', 'area_code', 'rent', 'role']

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

    # update method for profile model
    def update(self, instance, validated_data):
        # fetch profile picture from validated data
        profile_picture_data = validated_data.get('profile_picture', None)

        # check if profile_picture_data is a base64 string
        if profile_picture_data and self.is_base64(profile_picture_data):
            # split base64 from profile_picture string
            # returns formatted and image string after split
            formated, image_string = profile_picture_data.split(';base64,')
            ext = formated.split(',')[-1]
            # decoding image
            decoded_image = base64.b64decode(image_string)

            # upload image to cloudinary when image is decoded
            upload_result = cloudinary.uploader.upload(
                ContentFile(decoded_image, name=f'profile_picture.{ext}'),
                folder="profile_picture",
            )

            # fetch url of image from cloudinary
            instance.profile_picture = upload_result['url']

        # iterate over items from validated data
        for attr, value in validated_data.items():
            if attr != 'profile_picture':
                setattr(instance, attr, value)

        # save data to database
        instance.save()
        return instance

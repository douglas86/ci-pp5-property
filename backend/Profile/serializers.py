import base64
import cloudinary

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
    address = serializers.SerializerMethodField()
    area_code = serializers.SerializerMethodField()
    rent = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()

    def get_address(self, obj):
        return obj.address

    def get_area_code(self, obj):
        return obj.area_code

    def get_rent(self, obj):
        return obj.rent

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
    profile_picture = serializers.CharField(required=False)

    class Meta:
        model = Authentication
        fields = ['profile_picture', 'address', 'area_code', 'rent', 'role']

    # def get_profile_picture(self, obj):
    #     print('obj', obj)
    #     if obj.profile_picture:
    #         return obj.profile_picture.name.split('/')[-1]
    #     return None

    def is_base64(self, data):
        if data.startswith('data:image'):
            data = data.split(',')[1]

        try:
            decoded_data = base64.b64decode(data, validate=True)
            encoded_data = base64.b64encode(decoded_data).decode('utf-8')
            return encoded_data == data.strip()
            # if isinstance(data, str) and base64.b64encode(base64.b64decode(data)).decode('utf-8') == data:
            #     return True
            # return False
        except Exception:
            return False

    def update(self, instance, validated_data):
        profile_picture_data = validated_data.get('profile_picture', None)

        print('profile_picture_data', profile_picture_data)
        print('validated_data', validated_data)

        if profile_picture_data and self.is_base64(profile_picture_data):
            format, imgstr = profile_picture_data.split(';base64,')
            ext = format.split(',')[-1]
            decoded_image = base64.b64decode(imgstr)

            upload_result = cloudinary.uploader.upload(
                ContentFile(decoded_image, name=f'profile_picture.{ext}'),
                folder="profile_picture",
            )

            instance.profile_picture = upload_result['url']
            print("True")
        else:
            print("False")

        for attr, value in validated_data.items():
            if attr != 'profile_picture':
                setattr(instance, attr, value)

        instance.save()
        return instance

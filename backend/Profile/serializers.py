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
    class Meta:
        model = Authentication
        fields = '__all__'

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

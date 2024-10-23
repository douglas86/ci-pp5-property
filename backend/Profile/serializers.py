from adrf.serializers import Serializer
from rest_framework import serializers


class ProfileSerializer(Serializer):
    """
    Serializer for Profile model
    """

    id = serializers.SerializerMethodField()
    user = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.id')
    profile_picture = serializers.SerializerMethodField()
    address = serializers.ReadOnlyField(source='user.address')
    area_code = serializers.ReadOnlyField(source='user.area_code')
    rent = serializers.ReadOnlyField(source='user.rent')
    role = serializers.SerializerMethodField()
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()

    def get_id(self, obj):
        return obj.user.id

    def get_profile_picture(self, obj):
        """
        Get Profile URL from a database
        :param obj:
        :return:
        """

        return obj.profile_picture.url

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

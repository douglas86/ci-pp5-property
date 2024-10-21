from adrf.serializers import Serializer
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.core.exceptions import ValidationError


class AuthSerializers(Serializer):
    """
    Serializer class for an Auth model
    """

    id = serializers.SerializerMethodField()
    user = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.id')
    profile_picture = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()

    def get_id(self, obj):
        return self.user.id

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

class ChangePasswordSerializer(Serializer):
    """
    This serializer is used to change password.
    Taking in the old password and replacing it with new one.
    """

    username: serializers.CharField(required=True, allow_blank=False)
    old_password: serializers.CharField(required=True, allow_blank=False)
    new_password: serializers.CharField(required=True, allow_blank=False)

    def validate_password(self, value):
        """
        Method used to validate the old password and replacing it with new one.
        :param value:
        :return:
        """

        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.message)
        return value

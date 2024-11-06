from tokenize import TokenError

from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User


class IsAuthenticated(BasePermission):
    """
    Allows access only to authenticated users.
    """

    model = User

    message = "You are allowed to access this endpoint"
    error_message = "You are forbidden to access this endpoint"

    def authenticate(self, request):
        try:
            if 'Authorization' not in request.headers:
                raise AuthenticationFailed('Authorization header is missing')

            # validate tokens in requested headers
            authorization_header = request.headers['Authorization']
            token = authorization_header.split(" ")[1]
            token_valid = AccessToken(token)

            # fetch users data when token valid
            user_id = token_valid['user_id']
            user = self.model.objects.get(id=user_id)
            request.user = user

            if user:
                return True
            else:
                return False

        except (TokenError, User.DoesNotExist):
            raise AuthenticationFailed('Token is invalid or user not found')

    def has_permission(self, request, view):
        user = self.authenticate(request)

        if user:
            return True
        else:
            return False


class IsSuperUser(BasePermission):
    """
    Allows access only to superusers.
    """

    model = User

    message = "You are allowed to access this endpoint"
    error_message = "You are forbidden to access this endpoint"

    def authenticate(self, request):
        """
        Authenticate users based on tokens
        """

        try:
            if 'Authorization' not in request.headers:
                raise AuthenticationFailed('Authorization header is missing')

            # validate tokens in requested header
            authorization_header = request.headers['Authorization']
            token = authorization_header.split(" ")[1]
            token_valid = AccessToken(token)

            # fetch users data when token valid
            user_id = token_valid['user_id']
            user = self.model.objects.get(id=user_id)

            # validate is the current logged-in user a superuser
            if user.is_superuser:
                return user
            else:
                return False

        except (TokenError, User.DoesNotExist):
            raise AuthenticationFailed('Token is invalid or user not found')

    def has_permission(self, request, view):
        """
        Authenticate users based on tokens
        """

        user = self.authenticate(request)

        if user and user.is_superuser:
            return True
        else:
            return False

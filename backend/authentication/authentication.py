from tokenize import TokenError

from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User


class JWTAuthenticationFromCookie:
    """
    Class to check if token is valid
    """

    success_code = True
    error_code = False

    def authenticate(self, request):
        """
        Authenticate token and return user information
        """

        try:
            # get Authorization token from header
            authorization_header = request.headers['Authorization']
            # get token from header after Bearer
            token = authorization_header.split(" ")[1]
            # check if the token is valid
            token_valid = AccessToken(token)

            # return user information after token valid
            user_id = token_valid['user_id']
            user = User.objects.get(id=user_id)
            request.user = user

            # return true on token_valid
            return self.success_code

        except TokenError:
            # return false if token not valid
            return self.error_code


class IsAuthenticated(BasePermission):
    model = User

    message = "You are allowed to access this endpoint"
    error_message = "You are forbidden to access this endpoint"

    def authenticate(self, request):
        try:
            if 'Authorization' not in request.headers:
                raise AuthenticationFailed('Authorization header is missing')

            authorization_header = request.headers['Authorization']
            token = authorization_header.split(" ")[1]
            token_valid = AccessToken(token)

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
    model = User

    message = "You are allowed to access this endpoint"
    error_message = "You are forbidden to access this endpoint"

    def authenticate(self, request):
        try:
            if 'Authorization' not in request.headers:
                raise AuthenticationFailed('Authorization header is missing')

            authorization_header = request.headers['Authorization']
            token = authorization_header.split(" ")[1]
            token_valid = AccessToken(token)

            user_id = token_valid['user_id']
            user = self.model.objects.get(id=user_id)

            if user.is_superuser:
                return user
            else:
                return False


        except (TokenError, User.DoesNotExist):
            raise AuthenticationFailed('Token is invalid or user not found')

    def has_permission(self, request, view):
        user = self.authenticate(request)

        if user and user.is_superuser:
            return True
        else:
            return False

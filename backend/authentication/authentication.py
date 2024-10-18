from django.contrib.messages import success
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User
import jwt

# class JWTAuthenticationFromCookie(JWTAuthentication):
#     def authenticate(self, request):
#         # Try to get the token from the 'Authorization' header (default behavior)
#         header_token = super().authenticate(request)
#         if header_token is not None:
#             return header_token
#
#         # Try to get the token from cookies if it's not in the header
#         cookie_token = request.COOKIES.get('auth-token')
#         if cookie_token:
#             try:
#                 validated_token = self.get_validated_token(cookie_token)
#                 return self.get_user(validated_token), validated_token
#             except jwt.InvalidTokenError:
#                 raise AuthenticationFailed('Invalid token in cookie')
#
#         return None

class JWTAuthenticationFromCookie:

    success_code = True
    error_code = False

    def authenticate(self, request):

        # get Authorization from header
        authorization_header = request.headers['Authorization']
        # get token from header after Bearer
        token = authorization_header.split(" ")[1]
        # check if the token is valid
        token_valid = AccessToken(token)

        user_id = token_valid['user_id']
        user = User.objects.get(id=user_id)
        request.user = user

        if token_valid:
            return self.success_code
        else:
            return self.error_code

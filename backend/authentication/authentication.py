from tokenize import TokenError

from rest_framework.response import Response
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


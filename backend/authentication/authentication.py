from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
import jwt

class JWTAuthenticationFromCookie(JWTAuthentication):
    def authenticate(self, request):
        # Try to get the token from the 'Authorization' header (default behavior)
        header_token = super().authenticate(request)
        if header_token is not None:
            return header_token

        # Try to get the token from cookies if it's not in the header
        cookie_token = request.COOKIES.get('auth-token')
        if cookie_token:
            try:
                validated_token = self.get_validated_token(cookie_token)
                return self.get_user(validated_token), validated_token
            except jwt.InvalidTokenError:
                raise AuthenticationFailed('Invalid token in cookie')

        return None
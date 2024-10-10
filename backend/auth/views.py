from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.
class LogoutView(APIView):
    """
    Logout user and block refresh token
    """

    message = "You have successfully logged out."

    def post(self, request):
        return self.logout(request)

    def logout(self, request):
        refresh = request.headers.get('refresh')
        refresh_token = RefreshToken(refresh)
        refresh_token.blacklist()

        return Response({'message': self.message, 'status': status.HTTP_200_OK})

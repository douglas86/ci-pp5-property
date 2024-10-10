from django.contrib.auth.models import User
from adrf.viewsets import ViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Authentication
from .serializers import ChangePasswordSerializer


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


class ChangePasswordView(ViewSet):
    """
    Changing password based on username
    """

    model = Authentication
    serializer_class = ChangePasswordSerializer

    success_message = 'You have successfully changed password.'
    error_message = 'There was an error changing password.'
    field_error_message = 'All fields are required.'

    status_200 = status.HTTP_200_OK
    status_400 = status.HTTP_400_BAD_REQUEST

    def change_password(self, request):
        """
        Logic to change password
        :param request:
        :return:
        """

        serializer = ChangePasswordSerializer(data=request.data)

        try:
            username = request.data['username']

            if serializer.is_valid():
                user = User.objects.get(username=username)
                if not user.check_password(serializer.validated_data['old_password']):
                    return Response({'message': self.error_message, 'status': self.status_400})

                user.set_password(serializer.validated_data['new_password'])
                user.save()
                return Response({'message': self.success_message, 'status': self.status_200})
        except KeyError:
            return Response({'message': self.field_error_message, 'status': self.status_400})

    def retrieve(self, request):
        """
        Send response to request
        :param request:
        :return:
        """

        return self.change_password(request)

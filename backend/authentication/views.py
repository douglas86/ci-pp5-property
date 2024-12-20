from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from adrf.viewsets import ViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Authentication
from .serializers import ChangePasswordSerializer


# Create your views here.
class LogoutView(APIView):
    """
    Logout user and block refresh token
    """

    message = "You have successfully logged out."

    async def get(self, request):
        """
        Logout user asynchronously
        """

        refresh_token = request.headers.get('X-Refresh-Token')

        if not refresh_token:
            return Response({'message': 'Refresh token was not provided.', 'status': status.HTTP_400_BAD_REQUEST})

        try:
            token = await sync_to_async(lambda: RefreshToken(refresh_token))()
            token.blacklist()
        except TokenError:
            return Response({'message': 'Token was invalid.', 'status': status.HTTP_400_BAD_REQUEST})

        return Response({'message': self.message, 'status': status.HTTP_200_OK})


class ChangePasswordView(ViewSet):
    """
    Changing password based on username
    """

    model = Authentication
    serializer_class = ChangePasswordSerializer

    success_message = 'You have successfully changed password, you can login.'
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
                try:
                    # Attempt to retrieve the user by username
                    user = User.objects.get(username=username)
                except User.DoesNotExist:
                    # Return a response if the user is not found
                    return Response({'message': "This user does not exist", 'status': 404},
                                    status=status.HTTP_404_NOT_FOUND)

                # check if the old password was correct
                if not user.check_password(request.data['old_password']):
                    return Response({'message': self.error_message, 'status': 400}, status=status.HTTP_400_BAD_REQUEST)

                # set and save the new password
                user.set_password(request.data['new_password'])
                user.save()
                return Response({'message': self.success_message, 'status': 200}, status=status.HTTP_200_OK)
        except KeyError:
            # catch missing fields in the request
            return Response({'message': self.field_error_message, 'status': 400}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request):
        """
        Send response to request
        :param request:
        :return:
        """

        return self.change_password(request)

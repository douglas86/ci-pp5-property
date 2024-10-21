from adrf.viewsets import ViewSet
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User


# Create your views here.
class DeleteUserByUsername(ViewSet):
    """
    Asynchronous class-based view for deleting a user by username.
    """

    async def delete(self, request):
        try:
            user = await User.objects.aget(username='testing')
            await user.adelete()
            return Response({'message': 'User deleted successfully.', 'status': 200}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist.', 'status': 400}, status=status.HTTP_400_BAD_REQUEST)
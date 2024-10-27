from adrf.viewsets import ViewSet
from allauth.account.views import logout
from rest_framework.response import Response
from rest_framework import status

from authentication.authentication import IsAuthenticated
from authentication.models import Authentication

from Profile.serializers import ProfileSerializer
from authentication.authentication import IsSuperUser
from django.contrib.auth.models import User


# Create your views here.
class MyProfileView(ViewSet):
    """
    Get My Profile
    """

    modal = Authentication
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request):
        """
        Fetches data for the current logged-in user
        :param request:
        :return:
        """

        if request.user.is_authenticated:
            profile = self.modal.objects.get(user=request.user.id)
            serializer = self.serializer_class(instance=profile, context={'request': request})

            return Response({'message': 'Data retrieved successfully', 'data': serializer.data},
                            status=status.HTTP_200_OK)
        else:
            return Response({'message': 'You are Forbidden from access this content'}, status=status.HTTP_403_FORBIDDEN)

class ProfileDeleteView(ViewSet):
    """
    Delete profile by id
    """

    modal = Authentication
    serializer_class = ProfileSerializer
    permission_classes = [IsSuperUser]

    message = "You have successfully deleted this user"
    error_message = "Something went wrong, please try again"

    def destroy(self, request, pk=None):
        """
        Destroy user
        """

        profile = self.modal.objects.get(user_id=pk)
        user = User.objects.get(pk=pk)

        try:
            if user.is_superuser:
                return Response({'message': 'You cannot delete an admin user', 'status': status.HTTP_200_OK})
            else:
                profile.delete()
                user.delete()
                return Response({'message': self.message, 'status': status.HTTP_200_OK})
        except profile.DoesNotExist:
            return Response({'message': self.error_message, 'status': status.HTTP_400_BAD_REQUEST})


class ProfileByIdView(ViewSet):
    """
    Get profile by id
    """

    model = Authentication
    serializer_class = ProfileSerializer

    def retrieve(self, request, pk=None):

        is_authenticated = JWTAuthenticationFromCookie().authenticate(request)

        if is_authenticated:

            profile = self.model.objects.filter(user_id=pk)

            if not profile:
                return Response({'message': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

            serializer = self.serializer_class(instance=profile, many=True, context={'request': request})

            return Response({'message': 'Data successfully received', 'data': serializer.data},
                            status=status.HTTP_200_OK)

        else:
            return Response({'message': 'You do not have permission to access this profile.'},
                            status=status.HTTP_403_FORBIDDEN)

class ProfileView(ViewSet):
    """
    View all profiles only is you are the admin
    """

    model = Authentication
    serializer_class = ProfileSerializer
    permission_classes = [IsSuperUser]

    def retrieve(self, request):
        profile = self.model.objects.all()
        serializer = self.serializer_class(instance=profile, many=True, context={'request': request})
        return Response({'message': 'Data fetched successfully', 'data': serializer.data, 'status': 200}, status=status.HTTP_200_OK)

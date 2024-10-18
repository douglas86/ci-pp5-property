from adrf.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from authentication.models import Authentication

from Profile.serializers import ProfileSerializer


# Create your views here.
class MyProfileView(ViewSet):
    """
    Get My Profile
    """

    modal = Authentication
    serializer_class = ProfileSerializer
    # permission_classes = [IsAuthenticated]

    def retrieve(self, request):
        """
        Fetches data for the current logged-in user
        :param request:
        :return:
        """

        print('headers', request.headers)

        if not request.user.is_authenticated:
            return Response({'message': 'You do not have permission to access this profile.', 'status': 403})

        profile = self.modal.objects.get(user=request.user.id)
        serializer = self.serializer_class(instance=profile, context={'request': request})

        return Response({'message':'Data retrieved successfully', 'data': serializer.data, 'status': 200})


class ProfileByIdView(ViewSet):
    """
    Get profile by id
    """

    model = Authentication
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk=None):

        if request.user.id != int(pk):
            return Response({'message': 'You do not have permission to access this profile.'}, status=status.HTTP_403_FORBIDDEN)

        profile = self.model.objects.filter(user_id=request.user.id)

        if not profile:
            return Response({'message': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(instance=profile, many=True, context={'request': request})

        return Response({'message': 'Data successfully received', 'data': serializer.data}, status=status.HTTP_200_OK)

from adrf.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from authentication.authentication import JWTAuthenticationFromCookie
from authentication.models import Authentication

from Profile.serializers import ProfileSerializer


# Create your views here.
class MyProfileView(ViewSet):
    """
    Get My Profile
    """

    modal = Authentication
    serializer_class = ProfileSerializer

    def retrieve(self, request):
        """
        Fetches data for the current logged-in user
        :param request:
        :return:
        """

        is_authenticated = JWTAuthenticationFromCookie().authenticate(request)

        if is_authenticated:
            profile = self.modal.objects.get(user=request.user.id)
            serializer = self.serializer_class(instance=profile, context={'request': request})

            return Response({'message': 'Data retrieved successfully', 'data': serializer.data},
                            status=status.HTTP_200_OK)
        else:
            return Response({'message': 'You are Forbidden from access this content'}, status=status.HTTP_403_FORBIDDEN)


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

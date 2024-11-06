from adrf.views import APIView
from asgiref.sync import sync_to_async
from rest_framework import status
from rest_framework.response import Response
from properties.models import Property
from properties.serializer import PropertySerializer

import drf_yasg


class HomeView(APIView):
    """
    Home route used to fetch data for the carousel or from properties model
    """

    model = Property
    serializer_class = PropertySerializer

    message = 'You have successfully fetched data from the properties model'
    error_message = 'Something went wrong while fetching data from the properties model'

    async def get(self, request):
        """
        Gets property data asynchronously
        """

        properties = await sync_to_async(lambda: list(self.model.objects.all()[:5]))()
        serializer = self.serializer_class(properties, many=True, context={'request': request})

        return Response({'message': self.message, 'data': serializer.data, 'status': status.HTTP_200_OK})

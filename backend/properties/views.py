from adrf.views import APIView
from django.shortcuts import render
from django.views.generic import CreateView
from rest_framework.response import Response
from rest_framework import status
from asgiref.sync import sync_to_async

from authentication.authentication import IsSuperUser, IsAuthenticated
from properties.models import Property
from properties.serializer import PropertySerializer


# Create your views here.
class CreatePropertyView(APIView):
    """
    Create a new property asynchronously.
    """

    serializer_class = PropertySerializer
    permission_classes = [IsSuperUser]

    async def post(self, request):
        """
        Creates a new property asynchronously
        """

        serializer = self.serializer_class(data=request.data['data'], context={'request': request})

        if serializer.is_valid():
            property_instance = await sync_to_async(serializer.save)()
            response_data = self.serializer_class(property_instance).data
            return Response({
                'message': 'You have successfully created a property',
                'data': response_data,
                'status':status.HTTP_201_CREATED
            })
        return Response({
            'message': 'Something went wrong with creating a property',
            'data': serializer.errors,
            'status': status.HTTP_400_BAD_REQUEST
        })


class ReadPropertyView(APIView):
    """
    Read a property asynchronously
    """

    model = Property
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    async def get(self, request):
        """
        Gets a property asynchronously
        """

        properties = await sync_to_async(lambda: list(self.model.objects.all()))()
        serializer = self.serializer_class(properties, many=True, context={'request': request})

        return Response({'message': 'You have successfully read a property', 'data': serializer.data, 'status':status.HTTP_200_OK})

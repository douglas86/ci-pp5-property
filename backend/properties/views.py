from adrf.views import APIView
from django.shortcuts import render
from django.views.generic import CreateView
from rest_framework.response import Response
from rest_framework import status
from asgiref.sync import sync_to_async

from properties.serializer import PropertySerializer


# Create your views here.
class CreatePropertyView(APIView):
    """
    Create a new property asynchronously.
    """

    serializer_class = PropertySerializer

    async def post(self, request):
        """
        Creates a new property asynchronously
        """

        serializer = self.serializer_class(data=request.data, context={'request': request})

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

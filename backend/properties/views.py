from adrf.views import APIView
from django.shortcuts import render
from django.views.generic import CreateView
from rest_framework.response import Response
from rest_framework import status
from asgiref.sync import sync_to_async

from authentication.authentication import IsSuperUser
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
                'status': status.HTTP_201_CREATED
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
    permission_classes = [IsSuperUser]

    async def get(self, request):
        """
        Gets a property asynchronously
        """

        properties = await sync_to_async(lambda: list(self.model.objects.all()))()
        serializer = self.serializer_class(properties, many=True, context={'request': request})

        return Response(
            {'message': 'You have successfully read a property', 'data': serializer.data, 'status': status.HTTP_200_OK})


class FilterPropertyView(APIView):
    """
    Filter a property asynchronously by area_code
    """

    serializer_class = PropertySerializer
    model = Property

    async def get(self, request):
        area_code = request.query_params.get('area_code', None)

        if area_code:
            properties = await sync_to_async(lambda: list(self.model.objects.filter(area_code__icontains=area_code)[:3]))()
        else:
            properties = await sync_to_async(lambda: list(self.model.objects.all()[:3]))()

        serializer = self.serializer_class(properties, many=True, context={'request': request})

        return Response({'message': 'You have successfully filter property data', 'data': serializer.data, 'status': status.HTTP_200_OK})


class UpdatePropertyView(APIView):
    """
    Update a property asynchronously
    """

    model = Property
    serializer_class = PropertySerializer
    permission_classes = [IsSuperUser]

    async def put(self, request, pk=None):
        """
        Updates a property asynchronously
        """

        try:
            properties = await sync_to_async(lambda: self.model.objects.get(id=pk))()
            serializer = self.serializer_class(instance=properties, data=request.data, context={'request': request}, partial=True)

            if serializer.is_valid():
                property_instance = await sync_to_async(serializer.save)()
                response_data = self.serializer_class(property_instance).data
                return Response({'message': 'You have successfully updated a property', 'data': response_data, 'status': status.HTTP_200_OK})
            return Response({'message': 'Something went wrong with updating a property', 'data': serializer.errors, 'status': status.HTTP_400_BAD_REQUEST})

        except self.model.DoesNotExist:
            return Response({'message': 'The property does not exist'}, status=status.HTTP_404_NOT_FOUND)


class DeletePropertyView(APIView):
    """
    Delete a property asynchronously
    """

    model = Property
    serializer_class = PropertySerializer
    permission_classes = [IsSuperUser]

    async def delete(self, request, pk=None):
        """
        Deletes a property asynchronously
        """

        try:
            property_instance = await sync_to_async(lambda: self.model.objects.get(pk=pk))()

            await sync_to_async(property_instance.delete)()

            return Response({'message': 'You have successfully deleted the property', 'status': status.HTTP_200_OK})

        except self.model.DoesNotExist:
            return Response({'message': 'The property does not exist', 'status': status.HTTP_400_BAD_REQUEST})

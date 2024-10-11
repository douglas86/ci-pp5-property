import asyncio

from adrf.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser


class HomeView(ViewSet):
    message = 'This is the home view'

    async def list(self, request):
        return Response({'message': self.message})

class AsyncViewSet:

    def __init__(self, model, **kwargs):
        super().__init__(**kwargs)
        self.model = model

    async def async_generator(self):
        yield self.model

    async def async_coroutine(self):
        async for data in self.async_generator():
            return data

    async def get_queryset(self):
        task = asyncio.create_task(self.async_coroutine())
        return await task

    def main(self):
        data = asyncio.run(self.get_queryset())
        return data

    def retrieve(self):
        data = self.main()
        return data


class IsSuperUser(IsAdminUser):
    def has_permission(self, request, view):
        return request.user.is_superuser
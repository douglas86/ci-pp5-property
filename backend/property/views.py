from adrf.viewsets import ViewSet
from rest_framework.response import Response


class HomeView(ViewSet):
    message = 'This is the home view'

    async def list(self):
        return Response({'message': self.message})
from adrf.viewsets import ViewSet
from rest_framework.response import Response


from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

class HomeView(ViewSet):
    message = 'This is the home view'

    async def list(self, request):
        return Response({'message': self.message})
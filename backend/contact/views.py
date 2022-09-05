from rest_framework import generics
from .serializer import ImageSerializer
from .models import UploadImageTest
from django.http import HttpResponse
import json

# Create your views here.
class ImageViewSet(generics.ListAPIView):
    queryset = UploadImageTest.objects.all()
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        name = request.data['name']
        file = request.data['image']
        image = UploadImageTest.objects.create(name=name,image=file)
        return HttpResponse(json.dumps({'message': "Uploaded"}), status=200)

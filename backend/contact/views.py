from rest_framework import generics
from .serializer import ImageSerializer
from .serializer import TextSerializer
from .models import UploadedImage
from .models import Contact
from django.http import HttpResponse
from PIL import Image
import json
import pytesseract

# Create your views here.
class ImageViewSet(generics.ListAPIView):
    queryset = UploadedImage.objects.all()
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        name = request.data['name']
        file = request.data['image']
        image = UploadedImage.objects.create(name=name,image=file)
        return HttpResponse(json.dumps({'message': 'Uploaded', 'filename': str(image.image)}), status=200)

class ImageTextSet(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = TextSerializer

    def getImageText(self, filename):
        # If you don't have tesseract executable in your PATH, include the following:
        #pytesseract.pytesseract.tesseract_cmd = r'<full_path_to_your_tesseract_executable>'

        image_text = pytesseract.image_to_string(Image.open(filename), lang='eng')
        return image_text


    def post(self, request, *args, **kwargs):
        filename = request.data['filename']
        image_text = self.getImageText(filename)

        return HttpResponse(json.dumps({'message': 'Text extracted from image.', 'image_text': image_text}), status=200)

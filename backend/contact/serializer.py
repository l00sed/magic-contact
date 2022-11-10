from rest_framework import serializers
from .models import UploadedImage
from .models import Contact

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedImage
        fields = ('name', 'image')

class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('first_name',
                  'last_name',
                  'phone')

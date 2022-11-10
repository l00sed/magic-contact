from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

def nameFile(instance, filename):
    return '/'.join(['images', str(instance.name), filename])

class UploadedImage(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to=nameFile, blank=True, null=True)

class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = PhoneNumberField()

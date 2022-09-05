from django.urls import path
from .views import ImageViewSet

urlpatterns = [
    path('upload/', ImageViewSet.as_view(), name='upload'),
]


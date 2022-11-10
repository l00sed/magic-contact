from django.urls import path
from .views import ImageViewSet
from .views import ImageTextSet

urlpatterns = [
    path('upload/', ImageViewSet.as_view(), name='upload'),
    path('get_image_text/', ImageTextSet.as_view(), name='get_text_content'),
]


from django.urls import re_path
from apps.logistics.consumers import AsyncPackageConsumer

websocket_urlpatterns = [
    re_path(r"app/ws/all-package/", AsyncPackageConsumer.as_asgi()),
]


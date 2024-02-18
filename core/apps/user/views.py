import os, uuid
from django.conf import settings
from django.utils import timezone

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from apps.user.models import Client, Carrier
from apps.user.serializers import CarrierSerializer, ClientSerializer


class fetchAllCarrier(generics.ListAPIView):
    serializer_class = CarrierSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        """
        Retrieve all Carriers.
        Returns:
        - QuerySet: All Carriers.
        """
        data = Carrier.objects.all().order_by('-id')
        return data

    def get(self, request, *args, **kwargs):
        """
        Handle GET request to fetch all carriers.
        Returns:
        - Response: JSON response containing the serialized data.
        """
        try:
            queryset = self.get_queryset()
            serialized_data = self.serializer_class(queryset, many=True).data
            return Response(serialized_data)
        
        except Exception as e:
            eDate = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("fetchAllCarrier {} --> Error: {}\n".format(eDate, str(e)))
            return Response({'error': 'NotFound Carrier'}, status=status.HTTP_404_NOT_FOUND)


class fetchAllClient(generics.ListAPIView):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        """
        Retrieve all clients.
        Returns:
        - QuerySet: All clients.
        """
        data = Client.objects.all().order_by('-id')
        return data

    def get(self, request, *args, **kwargs):
        """
        Handle GET request to fetch all clients.
        Returns:
        - Response: JSON response containing the serialized data.
        """
        try:
            queryset = self.get_queryset()
            serialized_data = self.serializer_class(queryset, many=True).data
            return Response(serialized_data)
        
        except Exception as e:
            eDate = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("fetchAllClient {} --> Error: {}\n".format(eDate, str(e)))
            return Response({'error': 'NotFound Carrier'}, status=status.HTTP_404_NOT_FOUND)
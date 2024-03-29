import os
from django.conf import settings
from django.utils import timezone

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from apps.logistics.models import Package
from apps.logistics.serializers import PackageSerializer

from apps.user.models import Client, Carrier


class fetchPackageByClient(generics.ListAPIView):
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self, id):
        """
        Retrieve packages associated with the specified client.
        Returns:
        - QuerySet: Packages associated with the client.
        """
        client = Client.objects.get(id=id)
        data = Package.objects.filter(client=client).order_by('-id')
        return data

    def get(self, request, *args, **kwargs):
        """
        Handle GET request to fetch packages by client.
        Returns:
        - Response: JSON response containing the serialized data.
        """
        try:
            id = request.data.get('id', '')
            queryset = self.get_queryset(id)
            serialized_data = self.serializer_class(queryset, many=True).data
            return Response(serialized_data)
        
        except Exception as e:
            eDate = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("fetchPackageByClient {} --> Error: {}\n".format(eDate, str(e)))
            return Response({'error': 'NotFound Client'}, status=status.HTTP_404_NOT_FOUND)


class fetchPackageByCarrier(generics.ListAPIView):
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self, id):
        """
        Retrieve packages associated with the specified carrier.
        Returns:
        - QuerySet: Packages associated with the carrier.
        """
        carrier = Carrier.objects.get(id=id)
        data = Package.objects.filter(carrier=carrier).order_by('-id')
        return data

    def get(self, request, *args, **kwargs):
        """
        Handle GET request to fetch packages by carrier.
        Returns:
        - Response: JSON response containing the serialized data.
        """
        try:
            id = request.data.get('id', '')
            queryset = self.get_queryset(id)
            serialized_data = self.serializer_class(queryset, many=True).data
            return Response(serialized_data)
        
        except Exception as e:
            eDate = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("fetchPackageByCarrier {} --> Error: {}\n".format(eDate, str(e)))
            return Response({'error': 'NotFound Carrier'}, status=status.HTTP_404_NOT_FOUND)


class requestPackage(generics.GenericAPIView):
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Create a new package.
        Returns:
        - Response: JSON response indicating success or failure of the operation.
        """
        try:
            data = request.data.copy()
            data['carrier'] = Carrier.objects.get(id=data['carrier']) if data['carrier'] else None
            data['client'] = Client.objects.get(id=data['client'])
            Package.objects.create(**data) 
            return Response({'success': 'The package has been create'}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            date = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("requestPackage {} --> Error: {}\n".format(date, str(e)))
            return Response({'error': 'NotFound Package.'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        """
        Update an existing package.
        Returns:
        - Response: JSON response indicating success or failure of the operation.
        """
        try:
            data = request.data.copy()
            data['client'] = Client.objects.get(id=data['client'])
            data['carrier'] = Carrier.objects.get(id=data['carrier'])
            obj = Package.objects.get(id=data['id'])
            for key, value in data.items():
                setattr(obj, key, value)
            obj.save()

            return Response({'success': 'The package has been updated'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            date = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("requestPackage {} --> Error: {}\n".format(date, str(e)))
            return Response({'error': 'NotFound Package.'}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, *args, **kwargs):
        """
        Delete an existing package.
        Returns:
        - Response: JSON response indicating success or failure of the operation.
        """
        try:
            data = request.data.copy()
            package = Package.objects.get(id=data['id'])
            package.delete()

            return Response({'success': 'The package has been deleted'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            date = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("requestPackage {} --> Error: {}\n".format(date, str(e)))
            return Response({'error': 'NotFound Package.'}, status=status.HTTP_400_BAD_REQUEST)


class assignPackageToCarrier(generics.ListAPIView):
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        """
        Assign a package to a carrier.
        Returns:
        - Response: JSON response indicating success or failure of the operation.
        """
        try:
            data = request.data.copy()
            data['client'] = Client.objects.get(id=data['client'])
            data['carrier'] = Carrier.objects.get(id=data['carrier'])

            obj = Package.objects.get(id=data['id'])

            for key, value in data.items():
                setattr(obj, key, value)
            obj.save()

            return Response({'success': 'The package has been assigned'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            date = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("assignPackageToCarrier {} --> Error: {}\n".format(date, str(e)))
            return Response({'error': 'NotFound Package.'}, status=status.HTTP_400_BAD_REQUEST)

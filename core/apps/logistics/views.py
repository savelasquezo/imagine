import os, uuid
from django.conf import settings
from django.utils import timezone

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from apps.logistics.models import Package
from apps.logistics.serializers import PackageSerializer

from apps.user.models import Client, Carrier
from apps.user.serializers import ClientSerializer, CarrierSerializer


class fetchPackageByClient(generics.ListAPIView):
    serializer_class = ClientSerializer
    permission_classes = [AllowAny] #IsAuthenticated
    def get_queryset(self, username):
        client = Client.objects.get(username=username)
        data = Package.objects.filter(client=client).order_by('-id')
        return data

    def get(self, request, *args, **kwargs):
        try:
            username = request.data.get('username', '')
            queryset = self.get_queryset(username)
            serialized_data = self.serializer_class(queryset, many=True).data
            return Response(serialized_data)
        
        except Exception as e:
            eDate = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("fetchPackageByClient {} --> Error: {}\n".format(eDate, str(e)))
            return Response({'error': 'NotFound Client'}, status=status.HTTP_404_NOT_FOUND)


class fetchPackageByCarrier(generics.ListAPIView):
    serializer_class = CarrierSerializer
    permission_classes = [AllowAny] #IsAuthenticated
    def get_queryset(self, username):
        carrier = Carrier.objects.get(username=username)
        data = Package.objects.filter(carrier=carrier).order_by('-id')
        return data

    def get(self, request, *args, **kwargs):
        try:
            username = request.data.get('username', '')
            queryset = self.get_queryset(username)
            serialized_data = self.serializer_class(queryset, many=True).data
            return Response(serialized_data)
        
        except Exception as e:
            eDate = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("fetchPackageByCarrier {} --> Error: {}\n".format(eDate, str(e)))
            return Response({'error': 'NotFound Carrier'}, status=status.HTTP_404_NOT_FOUND)


class requestPackage(generics.GenericAPIView):
    serializer_class = PackageSerializer
    permission_classes = [AllowAny] #IsAuthenticated

    def post(self, request, *args, **kwargs):

        carrier = request.data.get('carrier', '')
        client = request.data.get('client', '')

        weight = request.data.get('weight', '')
        height = request.data.get('height', '')
        width = request.data.get('width', '')
        depth = request.data.get('depth', '')

        source = request.data.get('source', '')
        address = request.data.get('address', '')

        data1 = {'carrier':carrier,'client':client,'weight':weight,'height':height,'width':width,'depth':depth,'source':source,'address':address }
        data2 = request.data.copy()

        try:
            return Response({'data1': data1}, status=status.HTTP_200_OK)
        
        except Exception as e:
            date = timezone.now().strftime("%Y-%m-%d %H:%M")
            with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
                f.write("requestPackage {} --> Error: {}\n".format(date, str(e)))
            return Response({'error': 'NotFound Package.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
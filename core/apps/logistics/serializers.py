from rest_framework import serializers
from apps.logistics.models import Package

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        depth = 1
        fields = '__all__'
from rest_framework import serializers
import apps.logistics.models as models

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Package
        fields = '__all__'
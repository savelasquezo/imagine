import os
from django.conf import settings
from django.utils import timezone

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from apps.logistics.models import Package
from apps.logistics.serializers import PackageSerializer

def getAsyncPackage():
    queryset = Package.objects.all().order_by("-id")
    serializer = PackageSerializer(queryset, many=True)
    return serializer.data

@receiver(post_save, sender=Package)
@receiver(post_delete, sender=Package)
def signalListPackage(sender, instance, **kwargs):
    try:
        channel_layer = get_channel_layer()
        data = getAsyncPackage()
        async_to_sync(channel_layer.group_send)(
            "groupListPackage",
            {
                "type": "asyncSignal",
                "data": data,
            }
        )

    except Exception as e:
        eDate = timezone.now().strftime("%Y-%m-%d %H:%M")
        with open(os.path.join(settings.BASE_DIR, 'logs/core.log'), 'a') as f:
            f.write("signalListPackage {} --> Error: {}\n".format(eDate, str(e)))
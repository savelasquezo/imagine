import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from rest_framework.renderers import JSONRenderer

@sync_to_async
def getAsyncPackage():
    from apps.logistics.models import Package
    from apps.logistics.serializers import PackageSerializer
    queryset = Package.objects.all().order_by("-id")
    serializer = PackageSerializer(queryset, many=True)
    return serializer.data

async def getAsyncListPackage():
    data = await getAsyncPackage()
    return data


class AsyncPackageConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.group_name = "groupListPackage"
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

        data = await getAsyncListPackage()
        await self.send(json.dumps(data))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def asyncSignal(self, event):
        data = event['data']
        await self.send(json.dumps(data))

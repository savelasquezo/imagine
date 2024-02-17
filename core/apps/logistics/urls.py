from django.urls import path, re_path
import apps.logistics.views as view

urlpatterns = [
    path('request-package/', view.requestPackage.as_view(), name='request-package'),
]
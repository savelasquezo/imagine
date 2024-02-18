from django.urls import path, re_path
import apps.user.views as view

urlpatterns = [
    path('fetch-all-carrier/', view.fetchAllCarrier.as_view(), name='fetch-all-carrier'),
    path('fetch-all-client/', view.fetchAllClient.as_view(), name='fetch-all-client'),
]
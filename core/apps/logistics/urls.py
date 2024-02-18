from django.urls import path, re_path
import apps.logistics.views as view

urlpatterns = [
    path('lambda-challenge/', view.LambdaChallenge.as_view(), name='lambda-challenge'),
    path('fetch-package-by-client/', view.fetchPackageByClient.as_view(), name='fetch-package-by-client'),
    path('fetch-package-by-carrier/', view.fetchPackageByCarrier.as_view(), name='fetch-package-by-carrier'),
    path('request-package/', view.requestPackage.as_view(), name='request-package'),
    path('assign-package-to-carrier/', view.assignPackageToCarrier.as_view(), name='assign-package-to-carrier'),
]
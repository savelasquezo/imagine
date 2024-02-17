from django.contrib import admin
from django.conf.locale.es import formats as es_formats

from apps.logistics.models import Package

class PackageAdmin(admin.ModelAdmin):

    list_display = (
        'code',
        'carrier',
        'client',
        'date_joined',
        'date_delivery',
        'state',
        'is_paid'
        )
    
    fieldsets = (
        ("", {"fields": 
            (('code','state','is_paid'),
             ('carrier','client'),
            )}
        ),
        ("Detalles", {"fields": 
            (('weight','height','width','depth'),
             ('source','address'),
             ('date_joined','date_delivery'),
            )}
        ),
    )
    
    list_filter=['state','is_paid']
    es_formats.DATETIME_FORMAT = "d M Y"

    readonly_fields = [field.name for field in Package._meta.fields]

admin.site.register(Package, PackageAdmin)





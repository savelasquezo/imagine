from django.contrib import admin
from django.conf.locale.es import formats as es_formats

import apps.logistics.models as models

class PackageAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'carrier',
        'client',
        'date_joined',
        'date_delivery',
        'state',
        'is_paid'
        )
    
    fieldsets = (
        ("", {"fields": 
            (('uuid'),
             ('carrier','client'),
             ('source','address'))
            }
        ),
        ("Detalles", {"fields": 
            (('weight','height','width','depth'))
            }
        ),
    )
    
    list_filter=['state','is_paid']
    es_formats.DATETIME_FORMAT = "d M Y"

    readonly_fields=['uuid','carrier','client']

admin.site.register(models.Package, PackageAdmin)




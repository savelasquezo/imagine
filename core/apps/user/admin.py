from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

import apps.user.models as models

class MyAdminSite(admin.AdminSite):
    index_title = 'Administrativa'
    verbose_name = "Imagine"


admin_site = MyAdminSite()
admin.site = admin_site
admin_site.site_header = "Imagine"



class UserAccountAdmin(BaseUserAdmin):
    list_display = ('username', 'email','city','phone')
    search_fields = ('username', 'email')

    fieldsets = (
        (None, {'fields': (('email','is_active','is_staff'), 'password')}),
            ('Información', {'fields': (
            ('username','date_joined'),
        )}),
    )

    fieldsets = (
        ("", {"fields": 
            (('email','is_active','is_staff'), 'password')
            }
        ),
        ("", {"fields": 
            (('username','date_joined'),)
            }   
        ),
        ("Detalles", {"fields": 
            (('city','street','phone'),)
            }
        ),
    )


    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )

    list_filter=[]

    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        self.inlines = []
        return fieldsets

    def get_readonly_fields(self, request, obj=None):
        return ['username','email','date_joined']


admin.site.register(models.Account, UserAccountAdmin)

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.conf.locale.es import formats as es_formats

from apps.user.models import Account, Client, Carrier

class MyAdminSite(admin.AdminSite):
    index_title = "Administrativa"
    verbose_name = "Imagine"


admin_site = MyAdminSite()
admin.site = admin_site
admin_site.site_header = "Imagine"



class AccountAdmin(UserAdmin):
    list_display = ("username", "email", "address", "phone")
    search_fields = ("username", "email")

    fieldsets = (
        ("Auth", {
            "fields": (
                ("username", "email", "is_active", "is_staff"),
                ("password",)
            )
        }),
        ("Informacion", {
            "fields": (
                ("first_name", "last_name"),
                ("address", "phone"),
            )
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("username", "email", "password1", "password2"),
        }),
    )

    list_filter = ["is_active", "is_staff"]

    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        self.inlines = []
        return fieldsets

    readonly_fields = ("username", "email")
    def has_add_permission(self, request, obj=None):
        return False

class ClientAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "email",
        "company",
        "nit",
        "is_active"
        )

    list_filter = ["is_active"]
    search_fields = ["username"]

    es_formats.DATETIME_FORMAT = "d M Y"
    
    Info = {"fields": (
            ("first_name","last_name"),
            ("address","phone"),
            ("date_joined","last_joined"),
    )}

    fieldsets = (
            ("", {"fields": (("username","email"),)}),
            ("", {"fields": (("company","nit"),)}),
            ("", Info),
    )



class CarrierAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "email",
        "vehicle_type",
        "license",
        "is_active"
        )

    list_filter = ["is_active"]
    search_fields = ["username"]

    es_formats.DATETIME_FORMAT = "d M Y"


    Info = {"fields": (
            ("first_name","last_name"),
            ("address","phone"),
            ("date_joined","last_joined"),
    )}

    fieldsets = (
            ("", {"fields": (("username","email"),)}),
            ("", {"fields": (("vehicle_type","license"),)}),
            ("", Info),
    )



admin.site.register(Account, AccountAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Carrier, CarrierAdmin)

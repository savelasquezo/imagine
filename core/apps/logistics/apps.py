from django.apps import AppConfig


class LogisticsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.logistics'
    verbose_name = 'Logistica'

    def ready(self):
        from . import signals
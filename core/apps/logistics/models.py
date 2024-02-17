import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from apps.user.models import Carrier, Client

states = (('hold','Pendiente'),('delivered','Entregado'),('refused','Devuelto'))

class Package(models.Model):
    code = models.CharField(max_length=8, unique=True, editable=False)

    carrier = models.ForeignKey(Carrier, on_delete=models.CASCADE, null=True, blank=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)

    weight = models.SmallIntegerField(_("Peso"), null=False, blank=False,
        help_text="Peso (gr)")
    height = models.SmallIntegerField(_("Altura"), null=False, blank=False,
        help_text="Altura (cm)")
    width = models.SmallIntegerField(_("Ancho"), null=False, blank=False,
        help_text="Ancho (cm)")
    depth = models.SmallIntegerField(_("Largo"), null=False, blank=False,
        help_text="Largo (cm)")

    source = models.CharField(_("Origen"),max_length=256, null=False, blank=False)
    address = models.CharField(_("Direccion"),max_length=256, null=False, blank=False)

    state = models.CharField(_('¿Estado?'), choices=states, default='hold', max_length=256, null=False, blank=True)

    date_joined = models.DateField(_("Fecha de Ingreso"), default=timezone.now)
    date_delivery = models.DateField(_("Fecha de Entrega"), default=timezone.now)

    is_paid = models.BooleanField(_("¿Pagado?"),default=False)

    def save(self, *args, **kwargs):
        if not self.code:
            lastPackage = Package.objects.last()
            idx = lastPackage.id if lastPackage else 0
            self.code = "X0" + str(1000 + int(idx))
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.code}"

    class Meta:
        indexes = [models.Index(fields=['code','carrier','client']),]
        verbose_name = _("Paquete")
        verbose_name_plural = _("Paquetes")
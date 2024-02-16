import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

states = (('hold','Pendiente'),('delivered','Entregado'),('refused','Devuelto'))

class Package(models.Model):

    id = models.UUIDField(_("ID"),default=uuid.uuid4, unique=True, primary_key=True)

    weight = models.FloatField(_("Peso"), null=False, blank=False,
        help_text="Peso (kg)")
    height = models.FloatField(_("Altura"), null=False, blank=False,
        help_text="Altura (cm)")
    width = models.FloatField(_("Ancho"), null=False, blank=False,
        help_text="Ancho (cm)")
    depth = models.FloatField(_("Largo"), null=False, blank=False,
        help_text="Largo (cm)")

    source = models.CharField(_("Origen"),max_length=256, null=False, blank=False)
    address = models.CharField(_("Direccion"),max_length=256, null=False, blank=False)

    state = models.CharField(_('¿Estado?'), choices=states, max_length=256, null=False, blank=True)

    date_joined = models.DateField(_("Fecha de Ingreso"), default=timezone.now)
    date_delivery = models.DateField(_("Fecha de Entrega"), default=timezone.now)

    is_paid = models.BooleanField(_("¿Pagado?"),default=True)

    def __str__(self):
        return f"{self.id}"

    class Meta:
        verbose_name = _("Producto")
        verbose_name_plural = _("Productos")


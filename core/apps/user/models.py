import uuid

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

types = (('truck','Camion'),('car','Carro'),('motobyke','Moto'))

class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('¡Email Obligatorio!')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class Account(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(_("ID"),default=uuid.uuid4, unique=True, primary_key=True)
    username = models.CharField(_("Usuario"),max_length=64, unique=True)
    email = models.EmailField(_("Email"),unique=True, null=False, blank=False)

    first_name = models.CharField(_('Nombre'), max_length=128, null=True, blank=True)
    last_name = models.CharField(_('Apellido'), max_length=128, null=True, blank=True)

    phone = models.CharField(_("Telefono"),max_length=64, null=True, blank=True)
    address = models.CharField(_("Direccion"),max_length=128, null=True, blank=True)

    date_joined = models.DateField(_("Fecha Ingreso"),default=timezone.now)
    last_joined = models.DateField(_("Ultimo Ingreso"),default=timezone.now)
   
    is_active = models.BooleanField(_("¿Activo?"),default=True)
    is_staff = models.BooleanField(_("¿Administrador?"),default=False)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email}"

    class Meta:
        verbose_name = _("Usuario")
        verbose_name_plural = _("Usuarios")


class Client(Account):

    company = models.CharField(_('Vehiculo'), choices=types, max_length=256, null=False, blank=True)
    vip = models.BooleanField(_("¿VIP?"),default=False)

    def __str__(self):
        return f"{self.email}"

    class Meta:
        indexes = [models.Index(fields=['email']),]
        verbose_name = _("Cliente")
        verbose_name_plural = _("Clientes")


class Carrier(Account):

    vehicle_type = models.CharField(_('Vehiculo'), choices=types, max_length=256, null=False, blank=True)
    license = models.CharField(_('Placa'), max_length=256, null=False, blank=True)

    def __str__(self):
        return f"{self.email}"

    class Meta:
        indexes = [models.Index(fields=['email']),]
        verbose_name = _("Transportista")
        verbose_name_plural = _("Transportistas")
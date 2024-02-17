# Generated by Django 5.0.2 on 2024-02-17 18:42

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(editable=False, max_length=8, unique=True)),
                ('weight', models.SmallIntegerField(help_text='Peso (gr)', verbose_name='Peso')),
                ('height', models.SmallIntegerField(help_text='Altura (cm)', verbose_name='Altura')),
                ('width', models.SmallIntegerField(help_text='Ancho (cm)', verbose_name='Ancho')),
                ('depth', models.SmallIntegerField(help_text='Largo (cm)', verbose_name='Largo')),
                ('source', models.CharField(max_length=256, verbose_name='Origen')),
                ('address', models.CharField(max_length=256, verbose_name='Direccion')),
                ('state', models.CharField(blank=True, choices=[('hold', 'Pendiente'), ('delivered', 'Entregado'), ('refused', 'Devuelto')], default='hold', max_length=256, verbose_name='¿Estado?')),
                ('date_joined', models.DateField(default=django.utils.timezone.now, verbose_name='Fecha de Ingreso')),
                ('date_delivery', models.DateField(default=django.utils.timezone.now, verbose_name='Fecha de Entrega')),
                ('is_paid', models.BooleanField(default=True, verbose_name='¿Pagado?')),
            ],
            options={
                'verbose_name': 'Paquete',
                'verbose_name_plural': 'Paquetes',
            },
        ),
    ]

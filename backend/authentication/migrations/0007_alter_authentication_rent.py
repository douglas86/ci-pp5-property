# Generated by Django 5.1.1 on 2024-10-27 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_alter_authentication_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='authentication',
            name='rent',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
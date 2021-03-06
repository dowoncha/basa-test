# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-07-10 13:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='id',
        ),
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
        migrations.AlterUniqueTogether(
            name='location',
            unique_together=set([('city', 'country')]),
        ),
    ]

from django.contrib import admin

from . import models

# Register your models here.
admin.site.register(models.Tag)
admin.site.register(models.Location)
admin.site.register(models.Artist)
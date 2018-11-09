from django.contrib import admin
from . import models

@admin.register(models.ZipFile)
class ZipFileAdmin(admin.ModelAdmin):
    search_fields = (
        'file_name',
    )
    list_display = (
        'file_name',
        'file_creator',
        'created_at',
    )


@admin.register(models.List)
class ListAdmin(admin.ModelAdmin):
    search_fields = (
        'creator',
    )
    list_display = (
        'creator',
    )

from django.contrib import admin
from . import models

@admin.register(models.Music)
class MusicAdmin(admin.ModelAdmin):
    search_fields = (
        'Music_name',
        'Singer_name',
    )
    list_display = (
        'Music_name',
        'Singer_name',
    )

@admin.register(models.List)
class ListAdmin(admin.ModelAdmin):
    search_fields = (
        'List_name',
    )
    list_display = (
        'List_name',
        'List_creator',
        'List_serial',
    )
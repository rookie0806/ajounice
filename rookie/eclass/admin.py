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


@admin.register(models.Subject)
class SubjectAdmin(admin.ModelAdmin):
    search_fields = (
        'sub_name',
    )
    list_display = (
        'sub_name',
        'sub_id',
    )

@admin.register(models.List)
class ListAdmin(admin.ModelAdmin):
    search_fields = (
        'creator',
    )
    list_display = (
        'creator',
    )

@admin.register(models.NoteList)
class NoteListAdmin(admin.ModelAdmin):
    search_fields = (
        'creator',
    )
    list_display = (
        'creator',
    )


@admin.register(models.NoteFile)
class NoteFileAdmin(admin.ModelAdmin):
    search_fields = (
        'file_name',
        'file_url'
    )
    list_display = (
        'file_name',
        'file_url'
    )

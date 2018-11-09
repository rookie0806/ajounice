from rest_framework import serializers
from . import models
from rookie.users import models as user_models

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ZipFile
        fields = (
            "file_name",
            "file_creator",
            "file_url"
        )

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Subject
        fields = (
            'sub_name',
            'sub_id'
        )


class ListSerializer(serializers.ModelSerializer):
    Subject_list = SubjectSerializer(many=True)
    class Meta:
        model = models.List
        fields = (
            'Subject_list',
        )

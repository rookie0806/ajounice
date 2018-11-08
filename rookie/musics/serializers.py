from rest_framework import serializers
from . import models
from rookie.users import models as user_models
from taggit_serializer.serializers import (TagListSerializerField,TaggitSerializer)

class FeedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profileimg',
        )


class TagsSerializer(TaggitSerializer,serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = models.Music
        fields = (
            "tags",
        )


class MusicSerializer(serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = models.Music
        fields = (
            "Music_name",
            "Singer_name",
            "Album_name",
            "Server_img",
            "Grade",
            "tags",
            "Melon_serial",
            "Genie_serial",
            "Bugs_serial",
            "Mnet_serial",
            "Naver_serial",
        )

class ListSerializer(serializers.ModelSerializer):
    Song_list = MusicSerializer(many=True)
    List_creator = FeedUserSerializer() 
    class Meta:
        model = models.List
        fields = (
            'List_name',
            'List_serial',
            'Song_list',
            'List_creator',
            'created_at'
        )



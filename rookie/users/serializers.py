from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from . import models
class UserListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.User
        fields = (
            'username',
            'name',
        )


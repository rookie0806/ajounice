from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

class User(AbstractUser):

    GENDER_CHOICE = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('not-specified','Not-specified')
    )
    # First Name and Last Name do not cover name patterns
    # around the globe.

    def __str__(self):
        return self.username
    
    name = models.CharField(_("Name of User"), blank=True, max_length=255)
    gender = models.CharField(max_length=100,choices=GENDER_CHOICE,null=True)


from django.db import models
from rookie.users import models as user_models
from taggit.managers import TaggableManager
from django.conf import settings
from pytz import timezone

# Create your models here.
class TimeStamp(models.Model):
    created_at = models.DateField(auto_now_add=True)
    @property
    def created_at_ymd(self):
        return self.created_at.strftime('%y%m%d')

    class Meta:
        abstract = True

class ZipFile(TimeStamp):
    file_name = models.CharField(max_length=30)
    file_creator = models.CharField(max_length=30,null=True)
    file_url = models.URLField(null=True)
    #file_url = models.FileField(null=True)

class Subject(models.Model):
    sub_name = models.CharField(max_length=30)
    sub_id = models.CharField(max_length=30)


class List(TimeStamp):
    creator = models.CharField(max_length=30)

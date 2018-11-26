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



class NoteFile(models.Model):
    file_name = models.CharField(max_length=100)
    file_url = models.CharField(max_length=100)
    def __str__(self):
        return '{}-{}'.format(self.file_name, self.file_url)


class NoteList(models.Model):
    Note_list = models.ManyToManyField(NoteFile)
    creator = models.CharField(max_length=30)
    def __str__(self):
        return '{}'.format(self.creator)


class ZipFile(TimeStamp):
    file_name = models.CharField(max_length=30)
    file_creator = models.CharField(max_length=30, null=True)
    note_list = models.OneToOneField(NoteList, on_delete=models.PROTECT,null=True)
    file_url = models.CharField(max_length=100, null=True)
    recent_download = models.CharField(max_length=100,null=True)
    #file_url = models.FileField(null=True)

class Subject(models.Model):
    sub_name = models.CharField(max_length=30)
    sub_id = models.CharField(max_length=30)
    def __str__(self):
        return '{}-{}'.format(self.sub_name, self.sub_id)

class List(TimeStamp):
    creator = models.CharField(max_length=30)
    Subject_list = models.ManyToManyField(Subject)

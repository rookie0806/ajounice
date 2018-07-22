from django.db import models
from rookie.users import models as user_models
from taggit.managers import TaggableManager
# Create your models here.

class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True

class Music(models.Model):
    Music_name = models.CharField(max_length=100,default="")
    Singer_name = models.CharField(max_length=100,default="")
    tags = TaggableManager()
    Melon_serial = models.IntegerField(default=0)
    Naver_serial = models.IntegerField(default=0)
    Bugs_serial = models.IntegerField(default=0)
    Genie_serial = models.IntegerField(default=0)
    Serial_nubmer = models.AutoField(primary_key=True)
    def __str__(self):
        return '{}-{}'.format(self.Music_name, self.Singer_name)

class List(TimeStamp):
    List_name = models.CharField(max_length=100,default="")
    List_serial = models.AutoField(primary_key=True)
    List_creator = models.ForeignKey(user_models.User,null=True, related_name='lists',on_delete=models.CASCADE)
    Song_list = models.ManyToManyField(Music)
    
    def __str__(self):
        return '{} - {}'.format(self.List_name,self.List_creator)

    class Meta:
        ordering = ['-created_at']

class Image(TimeStamp):
    file = models.ImageField()

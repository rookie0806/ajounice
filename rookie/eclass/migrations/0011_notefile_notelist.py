# Generated by Django 2.0.7 on 2018-11-25 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eclass', '0010_zipfile_file_subject'),
    ]

    operations = [
        migrations.CreateModel(
            name='NoteFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=50)),
                ('file_url', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='NoteList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creator', models.CharField(max_length=30)),
                ('Note_list', models.ManyToManyField(to='eclass.NoteFile')),
            ],
        ),
    ]

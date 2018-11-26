# Generated by Django 2.0.7 on 2018-11-09 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eclass', '0004_auto_20181109_1819'),
    ]

    operations = [
        migrations.CreateModel(
            name='List',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField(auto_now_add=True)),
                ('creator', models.CharField(max_length=30)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sub_name', models.CharField(max_length=30)),
                ('sub_id', models.CharField(max_length=30)),
            ],
        ),
    ]
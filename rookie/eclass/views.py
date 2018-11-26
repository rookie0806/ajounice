from . import models, serializers
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from . import subject
from django.http import HttpResponse
from django.core.files import File
from rest_framework.generics import ListAPIView
import requests
from . import zippy
from . import download
import os
import json
from . import login
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.files.temp import NamedTemporaryFile
from datetime import datetime
from . import models
from rookie.users import models as user_models
# Create your views here.


class TodayCheck(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        now = datetime.now()
        try:
            userid = request.query_params.get('userid', None)
            userfile = models.ZipFile.objects.filter(created_at=now).get(file_creator=userid)
            serializer = serializers.FileSerializer(userfile)
            return Response(data=serializer.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)



class Login(APIView):
    permission_classes = (AllowAny,)
    def post(self, request, format=None):
        print("dd")
        req = requests.Session()
        json_body = json.loads(request.body)
        userid = json_body['userid']
        userpw = json_body['userpw']
        ban_list=[]
        req, result = login.eclasslogin(req, userid,userpw)
        if(result):
            if(models.List.objects.filter(creator=userid).count()==0):
                sub_list = subject.subject(req,ban_list)
                sub_id_list = []
                for sub in sub_list:
                    if(models.Subject.objects.filter(sub_id=sub["sub_id"]).count()==0):
                        new_subject = models.Subject(sub_name=sub["sub_name"],sub_id=sub["sub_id"])
                        new_subject.save()
                    sub_id_list.append(sub["sub_id"])
                new_list = models.List(creator=userid)
                db_sub_list = []
                for i in models.Subject.objects.filter(sub_id__in=sub_id_list):
                    db_sub_list.append(i)
                #print(db_sub_list.object)
                new_list.save()
                new_list.Subject_list.set(db_sub_list)
                

            #serializer = serializers.SubjectSerializer(sub_list, many=True)
            #print(serializer.data)
            #new_list = models.List(creator=userid)
            #new_list.Subject_list.set(sub_list)
            #new_list.save()
            #serialiserializers.SubjectSerializer(sub_list,many=True)
            #print(sub_list.index("확률과정론"))
            #serializer = serializers.SubjectSerializer(sub_list,many=True)
            #response = Response(sub_list, status=status.HTTP_200_OK)
            #response.set_cookie(key="userid",value=userid)
            #response.set_cookie(key="userpw", value=userid)
            #try:
            #    userfile = models.user_models.objects.filter(value=userid)
            #except:
            #    new_user = models.user_models()
            #dirname = "rookie/temporary" + "/" + str(userid)
            #if not os.path.isdir(dirname):
	        #    os.makedirs(dirname)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class Subject(APIView):
    #permission_classes = (AllowAny,)
    def post(self, request, format=None):
        userid = request.user.username 
        req = requests.Session()
        json_body = json.loads(request.body)
        ban_list = []
        userpw = json_body['userpw']
        #print(userid)
        #try:
        try:
            userfile = models.ZipFile.objects.get(file_creator=userid)
            serializer = serializers.NoteSerializer(userfile.note_list.Note_list,many=True)
            for down_list in serializer.data:
                ban_list.append(down_list["file_url"])
        except:
            pass
        #print(userfile.note_list)
        #print(serializer.data)
        #print(user_info['note_list'])
        #except:
            #print("not")
        #print(userpw)
        req, result = login.eclasslogin(req, userid, userpw)
        if(result):
            sub_list = subject.subject(req,ban_list)
            serializer = serializers.SubjectSerializer(sub_list, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class Download(APIView):
    def post(self,request):
        userid = request.user.username
        req = requests.Session()
        json_body = json.loads(request.body)
        userpw = json_body['userpw']
        ban_list = []
        try:
            userfile = models.ZipFile.objects.get(file_creator=userid)
            serializer = serializers.NoteSerializer(userfile.note_list.Note_list, many=True)
            for down_list in serializer.data:
                ban_list.append(down_list["file_url"])
        
        except:
            pass
        
        dirname = "rookie/temporary" + "/" + str(userid)    
        cnt = 0
        req, result = login.eclasslogin(req, userid, userpw)
        if(result):
            sub_list = subject.subject(req, ban_list)
        for item in sub_list:
            try:
                note_list = models.NoteList.objects.get(creator=userid)
            except:
                note_list = models.NoteList(creator=userid)
                note_list.save()

            for note in item['Note_list']:
                cnt = cnt + 1
                try:
                    new_note = models.NoteFile.object.get(file_name=note["file_name"])
                except:
                    new_note = models.NoteFile(file_name=note["file_name"],file_url=note["file_url"])
                    new_note.save()
                note_list.Note_list.add(new_note)
            note_list.save()
            download.download(req, dirname+"/lecture", item['sub_id'], item['sub_name'], ban_list)
        if(cnt>0):
            zippy.makezip(dirname+"/"+userid, dirname+"/lecture/")
        now = datetime.now()
        try:
            zipfile = models.ZipFile.objects.get(file_creator=userid)
            zipfile.recent_download = now.strftime('%Y-%m-%d')
            zipfile.save()
            serializer = serializers.FileSerializer(zipfile)
        except:
            #new_file = models.ZipFile(file_name=userid+"님의 강의노트", file_creator=userid, file_url="http://localhost:8000/download/" +
            #                          userid+"/"+userid+".zip", note_list=note_list, recent_download=now.strftime('%Y-%m-%d'))
            new_file = models.ZipFile(file_name=userid+"님의 강의노트", file_creator=userid, file_url="http://ajounice.com/download/" +
                                      userid+"/"+userid+".zip", note_list=note_list, recent_download=now.strftime('%Y-%m-%d'))
            new_file.save()
            serializer = serializers.FileSerializer(new_file)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
        '''

        now = datetime.now()
        try:
            userfile = models.ZipFile.objects.filter(created_at=now).get(file_creator=userid)
            serializer = serializers.FileSerializer(userfile)
        except:
            dirname = "rookie/temporary" + "/" + str(userid)
            try:
                req = requests.Session()
                req, result = login.eclasslogin(req, userid, userpw)
                sub_list = subject.subject(req)
                for item in sub_list:
                    if item['sub_id'] in sub_id:
                        download.download(req, dirname, item['sub_id'], item['sub_name'])
                zippy.makezip(dirname+"/"+userid, dirname)
                new_file = models.ZipFile(file_name=userid+"님의 강의노트",file_creator=userid,file_url=dirname+"/"+userid+".zip")
                new_file.save()
                serializer = serializers.FileSerializer(new_file)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
        '''
        #return Response(status=status.HTTP_200_OK)
'''
class ListTagTop100(ListAPIView): #Tag not contain Top 100
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return
        
    def get(self, request, format=None):
        tags = request.query_params.get('tags',None)
        #tags = tags.split(",")
        List = models.Music.objects.filter(Parsing_time="2018090818").exclude(tags__name__in=tags).order_by('Grade')[:100]
        serializer = serializers.MusicSerializer(List,many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)

class GetTag(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        melonSerial = request.query_params.get('melonNum', None)
        music = models.Music.objects.get(Melon_serial=melonSerial)
        serializer = serializers.MusicSerializer(music)
        return Response(data=serializer.data)

class ListTop100(ListAPIView):
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return
    def get(self, request, format=None):
        
        List = models.Music.objects.filter(Parsing_time="2018090818").order_by('Grade')[:100]
        serializer = serializers.MusicSerializer(List,many=True)
        return Response(data=serializer.data) 

class ListView(APIView):
    def get(self, request, format=None):
        Listtime = request.query_params.get('time', None)
        try:
            List = models.List.objects.filter(List_time=Listtime)
            serializer = serializers.ListSerializer(List, many=True)
            print(List)
            return Response(data=serializer.data)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)

class Applyimg(APIView):
    def get(self, request, format=None):
        try:
            parsingtime = request.query_params.get('time', None)
            user = request.user
            if(user.is_staff):
                for music in models.Music.objects.filter(Parsing_time=parsingtime).order_by('Grade'):
                    r = requests.get(music.Album_art)
                    img_temp = NamedTemporaryFile(delete=True)
                    img_temp.write(r.content)
                    img_temp.flush()
                    music.Server_img.save(str(music.Mnet_serial)+".jpg", File(img_temp), save=True)
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        
class MakeTop300List(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        try:
            user = request.user
            parsingtime = request.query_params.get('time', None)
            if(user.is_staff):
                top300List = []
                for music in models.Music.objects.filter(Parsing_time=parsingtime).order_by('Grade'):
                    top300List.append(music)
                list_obj = models.List(List_name="TOP300", List_time=parsingtime, List_creator=user)
                list_obj.save()
                list_obj.Song_list.set(top300List)
                #list_obj.save()
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

class Feed(APIView):

    def get(self, request, format=None):   
        user = request.user
        following_users = user.following.all()
        play_lists = [] 
        for following_user in following_users:
            song_lists = following_user.lists.all()[:3]
            for song_list in song_lists:
                play_lists.append(song_list)
    
        my_lists = user.lists.all()[:2]
        for my_list in my_lists:
            play_lists.append(my_list)

        sorted_list = sorted(play_lists,key=get_key,reverse=True)
        serializer = serializers.ListSerializer(sorted_list,many=True)

        return Response(serializer.data)
    
def get_key(List):
    return List.created_at


class Search(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        tags = request.query_params.get('tags',None)
        tags = tags.split(",")
        musics = models.Music.objects.filter(tags__name__in=tags).distinct()
        serializer = serializers.MusicSerializer(musics,many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)
'''

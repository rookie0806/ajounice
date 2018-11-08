from . import models, serializers
from rest_framework.views import APIView
from rest_framework import status
from django.core.files import File
from rest_framework.generics import ListAPIView
import requests
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.files.temp import NamedTemporaryFile
from datetime import datetime
from rookie.users import models as user_models
# Create your views here.


class ListTagTop100(ListAPIView): #Tag not contain Top 100
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return
        
    def get(self, request, format=None):
        tags = request.query_params.get('tags',None)
        tags = tags.split(",")
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

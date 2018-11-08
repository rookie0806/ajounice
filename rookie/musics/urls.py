from django.urls import path
from . import views
from django.conf.urls import url
app_name = "users"

urlpatterns = [
    url(
       regex=r'^top100/$',
       view=views.ListTop100.as_view(),
       name = 'view_top100'
   ),
   url(
       regex=r'^list/$',
       view=views.ListView.as_view(),
       name = 'List_View'
   ),
   url(
       regex=r'^feed/$',
       view=views.Feed.as_view(),
       name = 'Play_Lists'
   ),
   url(
       regex=r'^makeList/$',
       view=views.MakeTop300List.as_view(),
       name='make_Lists'
   ),
    url(
       regex=r'^saveImg/$',
       view=views.Applyimg.as_view(),
       name='save_Img'
    ),
   url(
       regex=r'^search/$',
       view=views.Search.as_view(),
       name = 'Search'
   ),
   url(
       regex=r'^getTag/$',
       view=views.GetTag.as_view(),
       name = 'getTag'
   ),
   url(
       regex=r'^tagList/$',
       view=views.ListTagTop100.as_view(),
       name = 'tagNotContain'
   )
]

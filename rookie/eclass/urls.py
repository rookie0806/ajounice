from django.urls import path
from . import views
from django.conf.urls import url
app_name = "users"

urlpatterns = [
    url(
        regex=r'^subject/$',
        view=views.Subject.as_view(),
        name='view_subject'
    ),
    url(
       regex=r'^check/$',
       view=views.TodayCheck.as_view(),
       name = 'view_check'
   ),
    url(
        regex=r'^login/$',
        view=views.Login.as_view(),
        name='view_login'
    ),
    url(
        regex=r'^download/$',
        view=views.Download.as_view(),
        name='view_down'
    ),
]

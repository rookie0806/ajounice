from django.urls import path
from . import views
from django.conf.urls import url
from rookie.users.views import (
    user_list_view,
    user_redirect_view,
    user_update_view,
    user_detail_view,
)

app_name = "users"
urlpatterns = [
    url(
        regex=r'^recommend/$',
        view=views.RecommendUser.as_view(),
        name='recommend_user'
    ),
    url(
        regex=r'^(?P<username>[\w.@+-]+)/followers/$',
        view=views.UserFollower.as_view(),
        name='user_followers'
    ),
    url(
        regex=r'^(?P<username>[\w.@+-]+)/following/$',
        view=views.UserFollowing.as_view(),
        name='user_following'
    ),
    url(
        regex=r'^(?P<username>[\w.@+-]+)/search/$',
        view=views.UserSearch.as_view(),
        name='user_Search'
    ),
    url(
        regex=r'^(?P<username>[\w.@+-]+)/password/$',
        view=views.ChangePassword.as_view(),
        name='ChangePassword'
    ),
    url(
        regex=r'^(?P<username>[\w.@+-]+)/$',
        view=views.UserProfile.as_view(),
        name='profile'
    ),
    #url(r'^login/facebook/$', views.FacebookLogin.as_view(), name='fb_login'),
    url(
        regex=r'(?P<user_id>[0-9]+)/follow/$',
        view=views.FollowUser.as_view(),
        name='follow_user'
    ),
    url(
        regex=r'(?P<user_id>[0-9]+)/unfollow/$',
        view=views.UnfollowUser.as_view(),
        name='unfollow_user'
    ),
    
]

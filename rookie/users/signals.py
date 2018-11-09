from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from io import BytesIO
from urllib.request import urlopen
from django.core.files import File
import ssl

'''@receiver(user_signed_up)
def user_signed_up(request, user, **kwargs):
    context = ssl._create_unverified_context()
    if len(user.socialaccount_set.all()) > 0:
        social_account = user.socialaccount_set.all()[0]
        uid = social_account.uid
        gender = social_account.extra_data.get('gender', None)
        user.gender = gender
        avatar = social_account.get_avatar_url()
        avatar_image = urlopen(avatar,context=context)
        io = BytesIO(avatar_image.read())
        user.profileimg.save('{}.jpg'.format(uid), File(io))
        user.name = user.get_full_name()
    user.save()'''

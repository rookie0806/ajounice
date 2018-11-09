import login
import subject
import download
import requests
import zippy
import os
if __name__ == '__main__':
    userid = input("id : ")
    userpw = input("pw : ")
    req = requests.Session()
    dirname = os.getcwd() + "/" + str(userid)
    req, result = login.login(req, str(userid), str(userpw))
    if not os.path.isdir(dirname):
	    os.mkdir(dirname)
    if(result):
        print("login success")
        sub_name, sub_num = subject.subject(req)
        for i in range(len(sub_name)-1):
            download.download(req,dirname,sub_num[i],sub_name[i])
        zippy.makezip(userid, userid)
    else:
        print("login failed")

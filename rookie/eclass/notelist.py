import codecs
import urllib.request
from urllib.parse import unquote
import os
import ssl


def notelist(req, ban_list, courseid):
    context = ssl.create_default_context()
    down_url = []
    return_list = []
    url = "https://eclass2.ajou.ac.kr/webapps/blackboard/execute/courseMain?course_id=" + courseid + "&task=true&src="
    resp = req.get(url)
    contentid = resp.text.split('content_id=')[1].split('&')[0]
    url = "https://eclass2.ajou.ac.kr/webapps/blackboard/content/listContent.jsp?course_id=" + \
        courseid + "&content_id=" + contentid + "&mode=reset"
    resp = req.get(url)
    ranges = resp.text.split('<a href="/bbcswebdav/')
    for j in range(len(ranges)-1):
        durl = resp.text.split('<a href="/bbcswebdav/')[j+1].split('"')[0]
        down_url.append("https://eclass2.ajou.ac.kr/bbcswebdav/" + durl)
    for i in range(len(down_url)-1):
        if down_url[i] in ban_list:
            pass
        else:
            resp = req.get(down_url[i], allow_redirects=False, headers={'Referer': 'https://eclass2.ajou.ac.kr'})
            header = str(resp.headers)
            name = header.split('/courses/')[1].split('/')[1].split("'")[0]
            return_list.append({"file_name" : unquote(name),"file_url":down_url[i]})
    #print(return_list)
    return return_list
        #print(dirname + "/" + coursename + "/" + unquote(name))
        #download_file(req, down_url[i].replace("https", "http"), dirname + "/" + coursename + "/" + unquote(name))

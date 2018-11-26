import requests
from . import notelist

def subject(req,ban_list):
    #print(req.cookies)
    url = "https://eclass2.ajou.ac.kr/webapps/portal/execute/tabs/tabAction"
    data = {"action": "refreshAjaxModule", "modId": "_22_1", "tabId": "_2_1","tab_tab_group_id":"_2_1"}
    resp = req.post(url,data=data)
    #print(resp.text)
    subject_list = resp.text.split("2018U00020032018")
    subject_list_serializer = []
    #print(subject_name_list)
    for i in range(0,len(subject_list)-1):
        subject_list_serializer.append({"sub_name": subject_list[i+1].split("_ ")[1].split("(")[0], "sub_id": subject_list[i].split("Course&id=")[len(subject_list[i].split("Course&id="))-1].split("&")[0], "Note_list":notelist.notelist(req,ban_list,subject_list[i].split("Course&id=")[len(subject_list[i].split("Course&id="))-1].split("&")[0])})
    return subject_list_serializer 

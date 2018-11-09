import requests

def eclasslogin(req,id,pw):
    url = "https://eclass2.ajou.ac.kr/webapps/login/"
    resp = req.get(url)
    url = "https://eclass2.ajou.ac.kr/webapps/bbgs-autosignon-BBLEARN/ajouLogin.jsp"
    data = {"userId":id,"userPw":pw}
    resp = req.post(url,data)
    #print(resp.text)
    if(resp.text.find("auth")>-1):
        url = "https://eclass2.ajou.ac.kr/" + resp.text.split("^/")[1]
        #print(url)
        resp = req.get(url)
        url = "https://eclass2.ajou.ac.kr/webapps/portal/frameset.jsp"
        resp = req.get(url)
        url = "https://eclass2.ajou.ac.kr/webapps/portal/execute/defaultTab"
        resp = req.get(url)
        url = "https://eclass2.ajou.ac.kr/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_1_1"
        resp = req.get(url)
        #print(req.cookies)
        #print(resp.text)
        result = True
    else:
        result = False
    return req,result

#login("jbshs2013","ehdgnl0805")

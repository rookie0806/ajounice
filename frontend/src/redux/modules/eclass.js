import {actionCreators as UserActions} from "redux/modules/user";

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//actions
const SET_SUBJECT = "SET_SUBJECT";
const SET_DOWNURL = "SET_DOWNURL";
//action creators
function setSubject(subject) {
    return {
        type: SET_SUBJECT,
        subject
    }
}
function setDownURL(url) {
    return {
        type: SET_DOWNURL,
        url
    }
}
function getDownUrl() {
    const url = "/eclass/download/"
    return function (dispatch, getState ) {
        const { user: { token } } = getState();
        fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //"X-CSRFToken": csrftoken,
                Authorization: `JWT ${token}`
            },
            body: JSON.stringify({
                "userpw": localStorage.getItem("eclass_pw"),
            })
        })
        .then(response => response.json())
        .then(json => dispatch(setDownURL(json))); 
        //.then(json => dispatch(setSubject(json))); 
    }
}
function getSubject() {
    console.log("dd")
    //var csrftoken = readCookie('csrftoken');
    const url = "/eclass/subject/"
    return function (dispatch, getState ) {
        const { user: { token } } = getState();
        fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //"X-CSRFToken": csrftoken,
                Authorization: `JWT ${token}`
            },
            body: JSON.stringify({
                "userpw": localStorage.getItem("eclass_pw")
            })
        })
        .then(response => response.json())
        .then(json => dispatch(setSubject(json))); /*
        .then(response=>{
            console.log(response)
            console.log(response.json())
        })
        .then(json=>{
            console.log(json)
            if (json.sub_name) {
                dispatch(setSubject(json.sub_name));
            }
        })*/
    }
}
//initial state
const initialState = {
};
//reducer
function reducer(state=initialState,action){
    switch(action.type){
        case SET_SUBJECT:
            return applySetSubject(state, action);
        case SET_DOWNURL:
            return applySetDown(state, action);
        default:
            return state;
    }
}
function applySetDown(state,action){
    const {url} = action;
    return {
        ...state,
        url
    };
}
function applySetSubject(state,action){
    const {subject} = action;
    return {
        ...state,
        subject
    };
}
const actionCreators = {
    getSubject,
    getDownUrl
};
export {
    actionCreators
};
//default reducer export

export default reducer;
//imports

//actions
const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SAVE_PRICE = "SAVE_PRICE";
const SET_MSG = "SET_MSG";
//actions creators
function SETMSG(msg) {
    return {
        type: SET_MSG,
        msg
    }
}
function applyMsg(state,action){
    const {msg} = action;
    return {
        ...state,
        msg
    };
}
function saveToken(token,pw){
    console.log(token)
    //console.log(pw)
    return{
        type: SAVE_TOKEN,
        token,
        pw
    }
}

function logout(){
    return{
        type: LOGOUT
    }
}
function savePrice(price){
    return{
        type: SAVE_PRICE,
        price
    }
}
//API actions
/*
function facebookLogin(access_token){
    return function(dispatch){
        fetch("/users/login/facebook/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                access_token
            })
        })
        .then(response=>response.json())
        .then(json=>{
            if(json.token){
                dispatch(saveToken(json.token);
            }
        })
        .catch(err=>console.log(err));
    };
}*/
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
function usernameLogin(username,password){
    var csrftoken = readCookie('csrftoken');
        return function(dispatch){
        fetch("/rest-auth/login/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response=>response.json())
        .then(json=>{
            if(json.token){
                dispatch(saveToken(json.token, password));
            }
            else{
                eclassLogin(username, password, dispatch);
            }
        })
    }
}
function eclassLogin(userid, userpw, dispatch) {
    var csrftoken = readCookie('csrftoken');
        fetch("/eclass/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken
                },
                body: JSON.stringify({
                    userid,
                    userpw,
                })
            })
            .then(response => {
                if (response.status===200) {
                    dispatch(SETMSG("2"))
                    createAccount(userid,userpw,userid+"@ajounice.com",userid,dispatch)
                }
                else{
                    dispatch(SETMSG("1"))
                }
            })
            .then(json=>{
                if(json!=undefined)
                dispatch(saveToken(json.token));
            })
}
function createAccount(username,password,email,name,dispatch){
        fetch("/rest-auth/registration/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password1 : password,
                password2 : password,
                email,
                name
            })
        })
        .then(response=>response.json())
        .then(json=>{
            console.log(json)
            if(json.token){
                dispatch(saveToken(json.token, password));
            }
        })
}
/*
function createAccount(username,password,email,name){
    return function(dispatch){
        fetch("/rest-auth/registration/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password1 : password,
                password2 : password,
                email,
                name
            })
        })
        .then(response=>response.json())
        .then(json=>{
            if(json.token){
                dispatch(saveToken(json.token));
            }
        })
    }
}*/
//initial state

const initialState = {
    isLoggedIn: localStorage.getItem("eclass_pw") ? true : false,
    token: localStorage.getItem("jwt"),
    pw: localStorage.getItem("eclass_pw")
}
//reducer

function reducer(state=initialState,action){
    switch(action.type){
        case SET_MSG:
            return applyMsg(state, action);
        case SAVE_PRICE:
            return applySetPrice(state,action);
        case SAVE_TOKEN:
            return applySetToken(state,action);
        case LOGOUT:
            return applyLogout(state,action);
        default:
            return state;
    }
}
//reducer functions

function applySetPrice(state,action){
    const {price} = action;
    return {
        ...state,
        price
    }
}
function applySetToken(state,action){
    const {token} = action;
    const {pw} = action;
    localStorage.setItem("jwt",token);
    localStorage.setItem("eclass_pw", pw);
    return {
        ...state,
        isLoggedIn:true,
        token,
        pw
    }
}

function applyLogout(state,action){
    localStorage.removeItem("jwt");
    localStorage.removeItem("eclass_pw");
    return {
        isLoggedIn:false
    }
}
//exports
const actionCreators = {
   // facebookLogin,
    usernameLogin,
    createAccount,
    logout
};

export {actionCreators};
//reducer exports

export default reducer;

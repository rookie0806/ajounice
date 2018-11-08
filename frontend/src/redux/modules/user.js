//imports

//actions
const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SAVE_PRICE = "SAVE_PRICE";
//actions creators
function saveToken(token){
    return{
        type: SAVE_TOKEN,
        token
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
                dispatch(saveToken(json.token));
            }
        })
        .catch(err=>console.log(err));
    };
}

function usernameLogin(username,password){
    return function(dispatch){
        fetch("/rest-auth/login/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response=>response.json())
        .then(json=>{
            if(json.token){
                dispatch(saveToken(json.token));
            }
        })
    }
}

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
}
//initial state

const initialState = {
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
    token: localStorage.getItem("jwt")
}
//reducer

function reducer(state=initialState,action){
    switch(action.type){
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
    localStorage.setItem("jwt",token);
    return {
        ...state,
        isLoggedIn:true,
        token
    }
}

function applyLogout(state,action){
    localStorage.removeItem("jwt");
    return {
        isLoggedIn:false
    }
}
//exports
const actionCreators = {
    facebookLogin,
    usernameLogin,
    createAccount,
    logout
};

export {actionCreators};
//reducer exports

export default reducer;

//imports
import {actionCreators as UserActions} from "redux/modules/user";

//actions
const SET_TOP100 = "SET_TOP100";
const SET_MUSIC = "SET_MUSIC";
const SET_TAG_MUSIC = "SET_TAG_MUSIC";
const PUSH_TAGS = "PUSH_TAGS";
const POP_TAGS = "POP_TAGS";
const SET_TAG_TOP100 = "SET_TAG_TOP100";
//action creators
function setTagTop100(top100) {
    return {
        type : SET_TAG_TOP100,
        top100
    }
}
function pushTag(tag) {
    return {
        type: PUSH_TAGS,
        tag
    }
}
function popTag(tag) {
    return {
        type: POP_TAGS,
        tag
    }
}
function setTop100(top100){
    return{
        type: SET_TOP100,
        top100
    }
}
function setMusic(melonmusic){
    return{
        type: SET_MUSIC,
        melonmusic
    }
}
function setTagMusic(tagMusic) {
    return {
        type: SET_TAG_MUSIC,
        tagMusic
    }
}
function getMusic(melonNum){
    const url = "/musics/getTag?melonNum=" + melonNum
    return (dispatch, getState) => {
        fetch(url)
        .then(response => response.json())
        .then(json => dispatch(setMusic(json)));
    }
}
function getTagMusic(Tag) {
    const url = "/musics/search?tags=" + Tag
    return (dispatch, getState) => {
        fetch(url)
            .then(response => response.json())
            .then(json => dispatch(setTagMusic(json)));
    }
}
function getTop100(){
    return (dispatch, getState) => {
        fetch("/musics/top100")
        .then(response => response.json())
        .then(json => dispatch(setTop100(json)));
    }
}
function getTagTop100(Tag) {
    console.log(Tag)
    const url = "/musics/tagList?tags=" + Tag
    return (dispatch, getState) => {
        fetch(url)
            .then(response => response.json())
            .then(json => dispatch(setTagTop100(json)));
    }
}
//initial state
const initialState={
   tags: localStorage.getItem("tags") ? localStorage.getItem("tags").split(',') : [],
};
//reducer

function reducer(state=initialState,action){
    switch(action.type){
        case SET_TOP100:
            return applySetTop100(state,action);
        case SET_MUSIC:
            return applySetMusic(state,action);
        case SET_TAG_MUSIC:
            return applySetTagMusic(state, action);
        case PUSH_TAGS:
            return applyPushTags(state, action);
        case POP_TAGS:
            return applyPopTags(state, action);
        case SET_TAG_TOP100:
            return applySetTagTop100(state,action);
        default:
            return state;
    }
}
//reducer functions 
function applyPopTags(state, action) {
    state.tags.pop(action.tag);
    localStorage.setItem("tags", state.tags);
    return {
        ...state,
    }
}
function applyPushTags(state, action) {
    console.log(state.tags)
    state.tags.push(action.tag);
    localStorage.setItem("tags", state.tags);
    return {
        ...state,
    }
}
function applySetTagMusic(state,action){
    const {tagMusic} = action;
    return {
        ...state,
        tagMusic
    }
}
function applySetMusic(state,action){
    const {melonmusic} = action;
    return {
        ...state,
        melonmusic
    }
}
function applySetTagTop100(state,action){
    const {top100} = action;
    return {
        ...state,
        top100
    };
}
function applySetTop100(state,action){
    const {top100} = action;
    return {
        ...state,
        top100
    };
}
//export 
const actionCreators ={
    getTagTop100,
    getTop100,
    getMusic,
    getTagMusic,
    pushTag,
    popTag,
};
export {actionCreators};
//default reducer export

export default reducer;
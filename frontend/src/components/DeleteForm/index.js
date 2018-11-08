import {connect} from "react-redux";
import Container from "./container";
import {actionCreators as musicActions} from "redux/modules/music";
//add all the action for
//login
//Sign up
//Recover password
//Check username
//Check password vaild
//Check email
const mapStateToProps = (state,ownprops) => {
    const {music : {melonmusic}} = state;
    const {music : {tagMusic}} = state;
    const {music : {tags}} = state;
    const {music : {seltag}} = state;
    return{
        seltag,
        melonmusic,
        tagMusic,
        tags,
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMusic: (melonNum) => {
            dispatch(musicActions.getMusic(melonNum));
        },
        getTagMusic : (Tags) => {
            dispatch(musicActions.getTagMusic(Tags));
        },
        pushTag: (tag) => {
            dispatch(musicActions.pushTag(tag));
        },
        popTag: (tag) => {
            dispatch(musicActions.popTag(tag));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
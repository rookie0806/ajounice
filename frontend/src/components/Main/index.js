import { connect } from "react-redux";
import Container from "./container";
import {actionCreators as MusicActions} from "redux/modules/music";

const mapStateToProps = (state,ownprops) => {
    const {music : {top100}} = state;
    const {music : {melonmusic}} = state;
    const {music : {tags}} = state;
    const {music : {tagMusic}} = state;
    return{
        tags,
        top100,
        melonmusic,
        tagMusic
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTop100: () => {
            dispatch(MusicActions.getTop100());
        },
        getTagTop100 : (tag) => {
            dispatch(MusicActions.getTagTop100(tag));
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Container);
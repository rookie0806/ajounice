import { connect } from "react-redux";
import Container from "./container";
import {actionCreators as EclassActions} from "redux/modules/eclass";

const mapStateToProps = (state,ownprops) => {
    const {eclass : {subject}} = state;
    const {eclass : {url}} = state;
    return{
        subject,
        url
    };
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getSubject: () => {
            dispatch(EclassActions.getSubject());
        },
        getDownUrl :() => {
            dispatch(EclassActions.getDownUrl());
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Container);
import {connect} from "react-redux";
import Container from "./container";
import {actionCreators as userActions} from "redux/modules/user";

const mapStateToProps = (state,ownprops) => {
    const {user : {msg}} = state;
    return {
        msg
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        usernameLogin:(username,password)=>{
            dispatch(userActions.usernameLogin(username,password));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Container);
import React from "react";
import formStyles from "shared/formStyles.scss";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";

const LoginForm = props => (
    <div className={formStyles.formComponent} >
        <form className={formStyles.form} onSubmit={props.handleSubmit}>
            <input 
                type = "text"
                placeholder="아이디" 
                className={formStyles.textInput}
                value={props.usernameValue}
                onChange={props.handleInputChange}
                name="username"
            />
            <input 
                type = "password" 
                placeholder="비밀번호" 
                className={formStyles.textInput}
                value={props.passwordValue}
                onChange={props.handleInputChange}
                name="password"
            />
            <input type = "submit" value="로그인" className={formStyles.button}/>
            <div className={formStyles.failure}>{props.msg==='1'?
                    <div>
                        Portal ID 혹은 PW를 확인해주세요.
                    </div> 
                    : props.msg==='2'?
                    <div>
                        로그인 성공
                    </div> 
                    :
                    <div></div>
                }
            </div>
        </form>
    </div>
);

LoginForm.propTypes = {
    usernameValue : PropTypes.string.isRequired,
    passwordValue : PropTypes.string.isRequired,
    handleInputChange : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func.isRequired,
    handleFacebookLogin : PropTypes.func.isRequired
}
export default LoginForm;
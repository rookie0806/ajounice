import React, {Component} from "react";
import LoginForm from "./presenter";
import PropTypes from "prop-types";
class Container extends Component{
    state ={
        username : "",
        password : "",
    }
    static propTypes = {
        usernameLogin: PropTypes.func.isRequired
    };
    render(){
        const {username,password} = this.state;
        const {msg} = this.props;
        return <LoginForm 
                    handleInputChange={this._handleInputChange} 
                    handleSubmit={this._handleSubmit}
                    handleFacebookLogin={this._handleFacebookLogin}
                    usernameValue={username} 
                    passwordValue={password}
                    msg={msg}
                />;
    }
    _handleInputChange = event=> {
        const { target : {value,name}} = event;
        this.setState({
            [name]: value
        });
    };
    _handleSubmit = event => {
        const {usernameLogin}  = this.props;
        const {username,password} = this.state;
        const {msg} = this.props;
        event.preventDefault();
        usernameLogin(username,password);
    };
}
export default Container;
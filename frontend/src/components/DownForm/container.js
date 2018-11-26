import React, {Component} from "react";
import Down from "./presenter";
import PropTypes from "prop-types";
import update from 'react-addons-update';


class Container extends Component{
    state = {
        loading: true,
        show : [
            {value:false},
            {value:false},
            {value:false},
            {value:false},
            {value:false},
            {value:false},
            {value:false},
            {value:false},
        ],
        visible: false,
    };
    static propTypes = {
        getSubject: PropTypes.func.isRequired,
        getDownUrl: PropTypes.func.isRequired,
    };
    _handleClick = (id,e) => {
       this.setState({
           show: update(
               this.state.show,
               {
                   [id]: {
                       value : {$set : !this.state.show[id].value}
                   }
               }
           )
       });
        e.preventDefault();
    }
    _downClick = event => {
        this.setState({
            visible : true
        })
            //console.log(this.state.visible)
        const {getDownUrl} = this.props;
        getDownUrl()
    }
    componentDidMount(){
        const {getSubject} = this.props;
        if(!this.props.subject){
            getSubject();
        }   
        else{
            this.setState({
                loading:false
            });
        }
    };
    componentWillReceiveProps = nextProps => {
        if(nextProps.subject){
            this.setState({
                loading: false
            });
        }
        if(nextProps.url){
            this.setState({
                visible: false
            })
            setTimeout(() => {
                const response = {
                    file: nextProps.url.file_url,
                };
                window.location.href = response.file;
            }, 100);
        }
    };
    render(){
        const {subject} = this.props;
        return <Down  {...this.state} downClick={this._downClick} handleClick={this._handleClick.bind(this)} subject={subject}/>
    }
}

export default Container;
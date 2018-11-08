import React, {Component} from "react";
import Main from "./presenter";
import PropTypes from "prop-types";

class Container extends Component{
    state = {
        loading:true,
    };
    static propTypes = {
        getTop100: PropTypes.func.isRequired,
        getTagTop100 : PropTypes.func.isRequired
    };

    componentDidMount(){
         const {getTagTop100} = this.props;
        if(!this.props.top100){
            getTagTop100(this.props.tags);
        }
        else{
            this.setState({
                loading:false
            });
        }
    };
    componentWillReceiveProps = nextProps => {
        const {getTagTop100} = this.props;
        if(nextProps.top100){
            this.setState({
                loading: false
            });
        }
        if(nextProps.tagMusic!==this.props.tagMusic){
            getTagTop100(this.props.tags);
        }
    };
    render(){
        const {top100} = this.props;
        return <Main{...this.state} top100={top100}/>
    }
}

export default Container;
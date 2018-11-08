import React, {Component} from "react";
import PropTypes from "prop-types";
import DeleteForm from "./presenter";  
class Container extends Component{
    constructor(props){
        super(props);
        this.state = {
            tags: [],
            seltag: [],
        }
    }
    static propTypes = {
       getMusic : PropTypes.func.isRequired,
       getTagMusic : PropTypes.func.isRequired,
       pushTag: PropTypes.func.isRequired,
       popTag: PropTypes.func.isRequired,
    };
    componentDidMount(){
        const {getTagMusic} = this.props;
        getTagMusic(this.state.seltag)
        const {getMusic} = this.props;
        getMusic(this.props.Melon_serial);
    };
    allreadyClick(param) {
        if (this.state.seltag.includes(param))
            return true;
        else
            return false;
    }
    handleClick = (param) => event => {
        const {getTagMusic} = this.props;
        const {pushTag} = this.props;
        const {popTag} = this.props;
        if (this.allreadyClick(param)) {
            this.setState({
                seltag: this.state.seltag.filter(text => text !== param)
            }, () => {
                popTag(param);
                getTagMusic(this.state.seltag.filter(text => text !== param))
            });
        }
        else{
            this.setState({
                seltag: this.state.seltag.concat(param)
            },() => {
                pushTag(param);
                getTagMusic(this.state.seltag.concat(param))
            });
            
        }
        
    };
    componentWillReceiveProps = nextProps => {
        if(nextProps.melonmusic){
            this.setState({
                tags: nextProps.melonmusic.tags
            });
        }
    };

    render(){
        console.log(this.props.loading)
        const {tagMusic} = this.props;
        const {seltag} = this.state;
        const {melonmusic} = this.props;
        return <DeleteForm {...this.state} seltag={seltag} handleClick={this.handleClick} tagMusic = {tagMusic} melonmusic = {melonmusic}/>;
    }
}
export default Container;
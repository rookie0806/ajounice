import React, {Component} from "react";
import Music from "./presenter";

class Container extends Component {
    handleClick = event => {
        const {Melon_serial} = this.props;
        event.preventDefault();
        var url = '/delete?melon=' + Melon_serial //팝업창 페이지 URL
        var winWidth = 700;
        var winHeight = 600;
        var popupOption = "width=" + winWidth + ", height=" + winHeight;
    };
    render() {
        return <Music handleClick={this.handleClick}{...this.props}/>;
    }
}
export default Container;
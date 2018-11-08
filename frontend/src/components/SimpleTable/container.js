import React, {Component} from "react";
import Music from "./presenter";

class Container extends Component {
    render() {
        return <Music {...this.props}/>;
    }
}
export default Container;
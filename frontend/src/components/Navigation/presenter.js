import React from "react";
import Ionicon from "react-ionicons";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

const Navigation = (props, context) => (
    <div className={styles.navigation}>
        <div className={styles.inner}>
            <div className={styles.column}>
            <div>
                <Link to="/">
                <img
                    src={require("images/logo.png")}
                    className={styles.logo}
                    alt={"Logo"}
                />
                </Link> 
            </div>
            <div className={styles.icons}>
                <div className={styles.navIcon}>
                    <a href="https://www.facebook.com/My100-264678524253592" target="_blank">
                        <Ionicon icon="logo-facebook" fontSize="28px" color="darkblue"/>
                    </a>
                </div>
            
                <div className={styles.navIcon}>
                    <a href="https://www.instagram.com/my100_official" target="_blank">
                        <Ionicon icon="logo-instagram" fontSize="28px" color="rgb(175, 23, 108)"/>
                    </a>
                </div>
                {props.isLoggedIn ?
                    <div className={styles.navIcon}>
                        <Link to="/logout">
                            <Ionicon icon="ios-log-out" fontSize="28px" color="black" />
                        </Link>
                    </div> 
                    :
                    <div className={styles.navIcon}>
                        <Link to="/">
                            <Ionicon icon="md-person" fontSize="28px" color="black"/>
                        </Link>
                    </div>
                } 
            </div>
            </div>
        </div>
    </div>
);
/*Navigation.contextTypes = {
    t : PropTypes.func.isRequired
}*/

export default Navigation;
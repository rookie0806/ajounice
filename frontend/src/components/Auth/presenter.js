import React from "react";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";
import Ad from "components/Adsense";

const Auth = (props, context) => (
    <main className={styles.auth}>
    <div className={styles.column}>
        <div className={`${styles.whiteBox} ${styles.formBox}`}>
        <img src={require("images/logo.png")} alt="Logo" width = "200px" height = "auto"/> 
        <span className={styles.sentence}>아주대 BlackBoard 아이디로 로그인해주세요</span> 
        {props.action==="login" && <LoginForm/>}
        < script async src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" > </script>
         <Ad/>
        </div>
        <div className={styles.appBox}>
        </div>  
    </div>
    </main>
);
export default Auth;
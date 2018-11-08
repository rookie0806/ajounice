import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import Music from "components/Music";
const Main = props => {
    if(props.loading){
        return <LoadingMain/>
    }
    else if(props.top100){
        return <RenderTop100 {...props}/>
    }
}

const LoadingMain = props => (
    <div className={styles.main}>
        <Loading/>
    </div>
)

const RenderTop100 = props => (
    <div className={styles.music}>
        <div className={styles.buttons}>
            <a href="melonplayer://play?ref=&menuid=19030101&cid=31293843&cflag=1&isHifiMenu=false&loginTime=undefined&userId=&memberKey=&token=undefined&mac=" className={styles.noline} >
                <button className = {styles.button_h}>
                    <img
                        src={require("images/melon.png")}
                        height="15px"
                        alt={"Logo"}
                    />
                        <span className={styles.word}>  멜론으로 듣기  </span>
                </button>
            </a>
            <button className={styles.button_h}>
                <img
                    src={require("images/genie.png")}
                    height="15px"
                    alt={"Logo"}
                />
                <span className={styles.word}>     지니로 듣기 </span>
            </button>
            <button className={styles.button_h}>
                <img
                    src={require("images/bugs.png")}
                    height="15px"
                    alt={"Logo"}
                />
                <span className={styles.word}> 벅스로 듣기 </span>
            </button>
            <button className={styles.button_h}>
                <img
                    src={require("images/mnet.png")}
                    height="18px"
                    alt={"Logo"}
                />
                <span className={styles.word}> 엠넷으로 듣기 </span>
            </button>
            <button className={styles.button_h}>
                <img
                    src={require("images/naver.png")}
                    height="15px"
                    alt={"Logo"}
                />
                <span className={styles.word}> 네이버로 듣기 </span>
            </button>
        </div>
        <table className={styles.top100}>
            <tr className={styles.table}>
                <td className={styles.column}>순위</td>
                <td className={styles.column}>앨범아트</td>
                <td className={styles.column}>곡명</td>
                <td className={styles.column}>가수</td>
                <td className={styles.column}>앨범명</td>
                <td className={styles.column}>삭제</td>
            </tr>
            {props.top100.map(music => <Music {...music} key={music.id}/>)} 
        </table>
    </div>
)

Main.propTypes = {
    MakeLoading : PropTypes.func.isRequired,
    loading : PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleCrawling: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
}

export default Main;
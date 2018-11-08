import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Tags from "components/Tags";
import SimpleTable from "components/SimpleTable";
const DeleteForm = props => (
    <main className={styles.delete}>
    <div className={styles.column}>
        <div className={`${styles.whiteBox} ${styles.formBox}`}>
            <img src={require("images/logo.png")} alt="Logo" width = "150px" height = "auto"/> 
            <span className={styles.sentence}>선택한 Tag가 있는 노래들을 전부 삭제합니다</span>
            <div className={styles.tag}>{props.tags.map((tags, i) => <Tags seltag={props.seltag} handleClick={props.handleClick} tag={tags} key={tags.id}/>)}</div>
                    <span className={styles.sentence}>삭제될 노래</span>
                    <div className={styles.music}>
                        <table className={styles.musics}>
                            <tr className={styles.table}>
                                <td className={styles.column}>앨범아트</td>
                                <td className={styles.column}>곡명</td>
                                <td className={styles.column}>가수</td>
                                <td className={styles.column}>앨범명</td>
                            </tr>
                                {props.tagMusic && props.tagMusic.map(music => <SimpleTable seltag={props.seltag} {...music} key={music.id}/>)}
                        </table>
                    </div>
                    <div className={styles.delete} >
                        <button className={styles.buttonWhite}> 
                            삭제 
                        </button>
                    </div>
        </div>
    </div>
    </main>
);

DeleteForm.propTypes = {
    tags: PropTypes.array.isRequired,
    handleClick : PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}
export default DeleteForm;
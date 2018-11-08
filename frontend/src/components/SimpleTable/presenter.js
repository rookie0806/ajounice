import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
const SimpleTable = (props, context) => {
    return(
        <tr className={styles.table}>
            <td className={styles.column}>
                <img className={styles.albumart} src={props.Server_img} alt={props.Album_name}></img>
            </td>
            <td className={styles.column}><div className={styles.music}>{props.Music_name}</div></td>
            <td className={styles.column}>{props.Singer_name}</td>
            <td className={styles.column}>{props.Album_name}</td>
        </tr>
    );
}

SimpleTable.propTypes = {
    Music_name : PropTypes.string.isRequired,
    Singer_name : PropTypes.string.isRequired,
    Album_name : PropTypes.string.isRequired,
    Server_img : PropTypes.string.isRequired,
}
export default SimpleTable;
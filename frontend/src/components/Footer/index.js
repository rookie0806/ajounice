import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
const Footer = (props, context) => (
  <footer className={styles.footer}>
    <div className={styles.column}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>회사 소개</li>
        </ul>
      </nav>
    </div>
    <div className={styles.column}>
      <span className={styles.companyName}>AjouNice</span>
    </div>
  </footer>
);

/*Footer.contextTypes = {
  t: PropTypes.func.isRequired
}*/
export default Footer;
import styles from "../../styles/components/organism/Footer.module.css";
import { labeled } from "../atom";
import Image from "react-bootstrap/Image";

import githubLogo from "../../assets/images/GitHub.png";
import LinkedinLogo from "../../assets/images/LinkedIn Circled.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        {labeled("London Properties")}
        <div className={styles.images}></div>
        <Image
          className={styles.image}
          src={`${LinkedinLogo}`}
          alt="Linkedin Logo"
        />
        <Image
          className={styles.image}
          src={`${githubLogo}`}
          alt="Github Logo"
        />
      </div>
      <div className={styles.right}>{labeled("Text")}</div>
    </footer>
  );
};

export default Footer;

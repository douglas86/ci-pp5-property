import styles from "../../styles/components/organism/Footer.module.css";
import { labeled } from "../atom";
import Image from "react-bootstrap/Image";

import githubLogo from "../../assets/images/footer/GitHub.png";
import LinkedinLogo from "../../assets/images/footer/LinkedIn Circled.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        {labeled("London Properties")}
        <div className={styles.images}>
          <a
            href="https://www.linkedin.com/in/douglas-maxton-58134b170/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.image}
              src={`${LinkedinLogo}`}
              alt="Linkedin Logo"
            />
          </a>
          <a
            href="https://github.com/douglas86"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.image}
              src={`${githubLogo}`}
              alt="Github Logo"
            />
          </a>
        </div>
      </div>
      <div className={styles.right}>{labeled("Text")}</div>
    </footer>
  );
};

export default Footer;

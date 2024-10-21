import styles from "../../styles/components/organism/Footer.module.css";
import { labeled } from "../atom";
import Image from "react-bootstrap/Image";

import githubLogo from "../../assets/images/footer/GitHub.png";
import LinkedinLogo from "../../assets/images/footer/LinkedIn Circled.png";
import AndroidLogo from "../../assets/images/footer/Android Phone.png";
import EmailLogo from "../../assets/images/footer/Email.png";

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
      <div className={styles.right}>
        <div className={styles.section}>
          <Image src={`${EmailLogo}`} alt="Email Logo" />
          <div className={styles.text}>
            {labeled("douglasmaxton@gmail.com")}
          </div>
        </div>
        <div className={styles.section}>
          <Image src={`${AndroidLogo}`} alt="Android Logo" />
          <div className={styles.text}>{labeled("074 427 81 303")}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

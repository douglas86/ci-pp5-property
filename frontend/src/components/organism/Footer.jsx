// 3rd party
import Image from "react-bootstrap/Image";

// atomic design
import { labeled } from "../atom";

// assets
import githubLogo from "../../assets/images/footer/GitHub.png";
import LinkedinLogo from "../../assets/images/footer/LinkedIn Circled.png";
import AndroidLogo from "../../assets/images/footer/Android Phone.png";
import EmailLogo from "../../assets/images/footer/Email.png";

// styling
import styles from "../../styles/components/organism/Footer.module.css";

/**
 * Footer gets displayed at bottom of page
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/*flex left in footer*/}
      <div className={styles.left}>
        {labeled("London Properties")}
        {/*LinkedIn and GitHub icons with links*/}
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
      {/*flex right in footer*/}
      <div className={styles.right}>
        <div className={styles.section}>
          {/*email address*/}
          <Image src={`${EmailLogo}`} alt="Email Logo" />
          <div className={styles.text}>
            {labeled("douglasmaxton@gmail.com")}
          </div>
        </div>
        {/*phone number*/}
        <div className={styles.section}>
          <Image src={`${AndroidLogo}`} alt="Android Logo" />
          <div className={styles.text}>{labeled("074 427 81 303")}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

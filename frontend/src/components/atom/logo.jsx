// assets
import Logo from "../../assets/logo.png";

// styling
import styles from "../../styles/components/atom/Atom.module.css";

/**
 * Displaying of the logo
 * @returns {JSX.Element}
 */
export const logo = () => (
  <img
    className={`${styles.image}`}
    src={`${Logo}`}
    alt={`London Properties`}
  />
);

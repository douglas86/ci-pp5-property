import Logo from "../../assets/logo.png";

import styles from "../../styles/components/atom/Atom.module.css";

export const logo = () => (
  <img
    className={`${styles.image}`}
    src={`${Logo}`}
    alt={`London Properties`}
  />
);

// styling
import styles from "../../styles/components/atom/Atom.module.css";

/**
 * A Nicely formatted message could also be a paragraph
 * @param message
 * @returns {JSX.Element}
 */
export const message = (message) => <p className={styles.message}>{message}</p>;

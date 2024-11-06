// atomic design
import { message, heading } from "../atom";

// styling
import styles from "../../styles/components/molecule/PageTitle.module.css";

/**
 * Title of the page
 * @returns {JSX.Element}
 * @constructor
 */
const PageTitle = () => {
  return (
    <div className={styles.pageTitle}>
      {heading("London Properties")}
      {message("Welcome to the best property site in London")}
    </div>
  );
};

export default PageTitle;

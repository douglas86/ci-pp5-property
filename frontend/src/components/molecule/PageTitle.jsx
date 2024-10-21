import { message, heading } from "../atom";

import styles from "../../styles/components/molecule/PageTitle.module.css";

const PageTitle = () => {
  return (
    <div className={styles.pageTitle}>
      {heading("London Properties")}
      {message("Welcome to the best property site in London")}
    </div>
  );
};

export default PageTitle;

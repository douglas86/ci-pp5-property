import { button } from "../../atom";

import styles from "../../../styles/components/organism/Admin.module.css";

const Panel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <a href="/admin/users/">
          {button(() => console.log("You clicked"), "Users", "dark")}
        </a>
        <a href="/admin/property/">
          {button(() => console.log("You clicked me"), "Properties", "dark")}
        </a>
      </div>
      <div className={styles.right}>
        {button(
          () => console.log("You clicked me"),
          "Add New Property",
          "success",
        )}
      </div>
    </div>
  );
};

export default Panel;

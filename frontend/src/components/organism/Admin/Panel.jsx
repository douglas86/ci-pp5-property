import { useNavigate } from "react-router-dom";

import { button } from "../../atom";

import styles from "../../../styles/components/organism/Admin.module.css";

const Panel = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {button(() => navigate("/admin/users/"), "Users", "dark")}
        {button(() => navigate("/admin/property/"), "Properties", "dark")}
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

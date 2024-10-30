import { useNavigate } from "react-router-dom";

import { button } from "../../atom";

import styles from "../../../styles/components/organism/Admin.module.css";
import useAppContext from "../../../hooks/useAppContext";

const Panel = () => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {button(() => navigate("/admin/users/"), "Users", "dark")}
        {button(() => navigate("/admin/property/"), "Properties", "dark")}
      </div>
      <div className={styles.right}>
        {button(
          () => {
            // load form for modal to display
            dispatch({ type: "WHICH FORM TO USE", payload: "CREATE PROPERTY" });
            // show modal on button click
            dispatch({ type: "CHANGE MODAL STATE", payload: true });
          },
          "Add New Property",
          "success",
        )}
      </div>
    </div>
  );
};

export default Panel;

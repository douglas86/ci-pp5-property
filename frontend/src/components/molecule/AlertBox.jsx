// 3rd parties
import { useEffect } from "react";
import { Alert } from "react-bootstrap";

// atomic structure
import { message } from "../atom";

// custom hooks
import useAppContext from "../../hooks/useAppContext";

// styling
import styles from "../../styles/components/molecule/AlertBox.module.css";

/**
 * This Molecule is used to display bootstrap alert boxes
 * status comes from state store
 *  200 - this is to say that the message is successful
 *  400 - this is to say that the message was unsuccessful
 *  If you enter anything else that those codes it will show a warning message
 * @constructor
 */
const AlertBox = () => {
  const { alert, dispatch } = useAppContext();
  const { status, msg } = alert;

  useEffect(() => {
    if (msg !== "") {
      const timer = setInterval(() => {
        dispatch({ type: "RESET MESSAGE" });
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [dispatch, msg]);

  return (
    <div className={styles.alertBox}>
      {msg !== "" ? (
        status === 200 ? (
          <div className={styles.alert}>
            <Alert variant="success">{message(msg)}</Alert>
          </div>
        ) : status === 400 ? (
          <div className={styles.alert}>
            <Alert variant="danger">{message(msg)}</Alert>
          </div>
        ) : (
          <div className={styles.alert}>
            <Alert variant="warning">
              {message("You have entered the incorrect status code")}
            </Alert>
          </div>
        )
      ) : null}
    </div>
  );
};

export default AlertBox;

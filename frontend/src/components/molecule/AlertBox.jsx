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

  // clear the message after 5 seconds
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
        // display a success message on status 200
        status === 200 ? (
          <div className={styles.alert}>
            <Alert variant="success">{msg}</Alert>
          </div>
        ) : // display an error message on status 400
        status === 400 ? (
          <div className={styles.alert}>
            <Alert variant="danger">{msg}</Alert>
          </div>
        ) : (
          // if there is no status code passed, a warning message gets displayed
          <div className={styles.alert}>
            <Alert variant="warning">
              You have entered the incorrect status code
            </Alert>
          </div>
        )
      ) : null}
    </div>
  );
};

export default AlertBox;

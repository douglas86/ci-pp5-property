// 3rd party
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

// atomic design
import { button } from "../../../atom";

// custom hooks and utils
import useAppContext from "../../../../hooks/useAppContext";
import { onSubmit } from "../../../../utils";

// styling
import styles from "../../../../styles/components/organism/Forms.module.css";

/**
 * Logout form currently being used for displaying in the Modal
 * @returns {JSX.Element}
 * @constructor
 */
const Logout = () => {
  // state store
  const { dispatch } = useAppContext();

  // React hook form functions
  const { handleSubmit } = useForm();

  useEffect(() => {
    // clear error messages from state store
    dispatch({ type: "FORM ERRORS", payload: {} });
    // change the header of the modal
    dispatch({ type: "CHANGE HEADER", payload: "Logout Form" });
  }, [dispatch]);

  return (
    <Form
      onSubmit={handleSubmit((data) =>
        onSubmit(data, "auth/logout/", dispatch),
      )}
    >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label column={true}>
          Are your sure that you want to Logout?
        </Form.Label>
      </Form.Group>

      {/*cancel and submit buttons*/}
      <div className={styles.btn}>
        {button(
          () => dispatch({ type: "CHANGE MODAL STATE", payload: false }),
          "Cancel",
          "secondary",
        )}
        {button("submit", "Logout", "danger")}
      </div>
    </Form>
  );
};

export default Logout;

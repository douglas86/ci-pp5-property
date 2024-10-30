// 3rd party
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";

// atomic design
import { button, spinner } from "../../../atom";

// custom hooks and utils
import useAppContext from "../../../../hooks/useAppContext";
import { titleCase } from "../../../../utils";
import onDelete from "../../../../utils/onDelete";

// styling
import styles from "../../../../styles/components/organism/Forms.module.css";

/**
 * Delete a users form
 * @returns {JSX.Element}
 * @constructor
 */
const UserDelete = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { loading, view } = forms;
  const { role, user, user_id } = view;

  // change modal state on component mount
  useEffect(() => {
    // change the header of the modal
    dispatch({
      type: "CHANGE HEADER",
      payload: `Delete ${titleCase(user)} from existance`,
    });
    // change the submit button text on modal
    dispatch({ type: "CHANGE BTN", payload: "Delete" });
  }, [dispatch, user_id, user]);

  return (
    <Form onSubmit={(e) => onDelete(e, `profile/delete/${user_id}/`, dispatch)}>
      {/*showing loading symbol on server request*/}
      {loading ? spinner() : null}

      {/*logic to check if user is admin*/}
      <Form.Label column={true}>
        {role === "admin"
          ? "But, wait he has superpowers he is an admin? Sorry, he cant be deleted?"
          : "Are you sure you want to delete this user?"}
      </Form.Label>

      {/*Cancel and Delete buttons*/}
      <div className={styles.btn}>
        {button(
          () => dispatch({ type: "CHANGE MODAL STATE", payload: false }),
          "Cancel",
          "secondary",
        )}

        {/*disable the delete button if the user is admin*/}
        <Button variant="danger" type="submit" disabled={role === "admin"}>
          Delete
        </Button>
      </div>
    </Form>
  );
};

export default UserDelete;

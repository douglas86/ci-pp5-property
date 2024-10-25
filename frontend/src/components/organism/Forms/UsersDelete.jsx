import { useEffect } from "react";
import useAppContext from "../../../hooks/useAppContext";
import Form from "react-bootstrap/Form";
import { titleCase } from "../../../utils";
import { Button } from "react-bootstrap";

import styles from "../../../styles/components/organism/Forms.module.css";
import { button } from "../../atom";

const UserDelete = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { view } = forms;
  const { role, user } = view;

  // change modal state on component mount
  useEffect(() => {
    // change the header of the modal
    dispatch({
      type: "CHANGE HEADER",
      payload: `Delete ${titleCase(user)} from existance`,
    });
    // change the submit button text on modal
    dispatch({ type: "CHANGE BTN", payload: "Delete" });
    // change the url needed for the submitted button
    // TODO: this endpoint has not been created yet
  }, [dispatch]);

  const onSubmit = async (data) => console.log("data", data);

  return (
    <Form onSubmit={onSubmit}>
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
        <Button variant="danger" type="submit" disabled={role === "admin"}>
          Delete
        </Button>
      </div>
    </Form>
  );
};

export default UserDelete;

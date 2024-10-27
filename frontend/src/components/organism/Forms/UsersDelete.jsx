import { useEffect } from "react";
import useAppContext from "../../../hooks/useAppContext";
import Form from "react-bootstrap/Form";
import { titleCase } from "../../../utils";
import { Button } from "react-bootstrap";
import { server } from "../../../utils";

import styles from "../../../styles/components/organism/Forms.module.css";
import { button } from "../../atom";
import axios from "axios";
import Cookies from "js-cookie";

const UserDelete = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { view } = forms;
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

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .delete(`${server}/profile/delete/${user_id}/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth-token")}`,
          "X-Refresh-Token": Cookies.get("refresh-token"),
        },
      })
      .then((res) => {
        console.log("res", res);

        // save data to success forms state in state store
        dispatch({ type: "FORM SUCCESS", payload: res });
        // close modal when data is correct from server
        dispatch({ type: "CHANGE MODAL STATE", payload: false });
      })
      .catch((err) => {
        console.log("err", err);

        // passing error messages to the state store,
        // these error messages get returned to the user on the current form when the modal is showing
        dispatch({ type: "FORM ERRORS", payload: err.response.data });
      });
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
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

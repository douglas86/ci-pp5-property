import Form from "react-bootstrap/Form";
import useAppContext from "../../../hooks/useAppContext";
import { useEffect } from "react";

const Logout = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    // change the header of the modal
    dispatch({ type: "CHANGE HEADER", payload: "Logout Form" });
    // change the submit button text on modal
    dispatch({ type: "CHANGE BTN", payload: "Logout" });
    // change the url needed for the submitted button
    dispatch({ type: "FORM SUBMIT URL", payload: "/auth/logout/" });
  }, [dispatch]);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label column={true}>
          Are your sure that you want to Logout?
        </Form.Label>
      </Form.Group>
    </Form>
  );
};

export default Logout;

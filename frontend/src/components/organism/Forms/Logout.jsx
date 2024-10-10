import Form from "react-bootstrap/Form";
import useAppContext from "../../../hooks/useAppContext";
import { useEffect } from "react";

const Logout = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    dispatch({ type: "CHANGE HEADER", payload: "Logout Form" });
    dispatch({ type: "CHANGE BTN", payload: "Logout" });
  }, []);

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

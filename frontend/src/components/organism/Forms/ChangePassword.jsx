import Form from "react-bootstrap/Form";
import { button } from "../../atom/button";
import { useEffect } from "react";
import useAppContext from "../../../hooks/useAppContext";

const ChangePassword = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    dispatch({ type: "CHANGE HEADER", payload: "Change Password Form" });
    dispatch({ type: "CHANGE BTN", payload: "Change Password" });
  }, [dispatch]);

  const handleLogin = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "" });

  const handleRegister = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "REGISTRATION" });

  return (
    <Form>
      {button(handleLogin, "Click here to Login?", "link")}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label column={true}>Username</Form.Label>
        <Form.Control type="text" placeholder="my name" autoFocus={true} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label column={true}>Your Password</Form.Label>
        <Form.Control type="password" placeholder="your password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
        <Form.Label column={true}>New Password</Form.Label>
        <Form.Control type="password" placeholder="change password here" />
      </Form.Group>
      {button(handleRegister, "Click here to Register?", "link")}
    </Form>
  );
};

export default ChangePassword;

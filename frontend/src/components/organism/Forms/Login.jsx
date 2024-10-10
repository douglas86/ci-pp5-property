import { button } from "../../atom/button";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import useAppContext from "../../../hooks/useAppContext";

const Login = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    dispatch({ type: "CHANGE HEADER", payload: "Login Form" });
    dispatch({ type: "CHANGE BTN", payload: "Login" });
  }, [dispatch]);

  const handleClick = () => console.log("You clicked me");

  return (
    <Form>
      {button(handleClick, "Click here to Register?", "link")}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label column={true}>Username</Form.Label>
        <Form.Control type="text" placeholder="my name" autoFocus={true} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label column={true}>Password</Form.Label>
        <Form.Control type="password" placeholder="your password" />
      </Form.Group>
      {button(handleClick, "Click here to change password?", "link")}
    </Form>
  );
};

export default Login;

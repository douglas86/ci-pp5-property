import Form from "react-bootstrap/Form";
import { button } from "../../atom/button";

const Registration = ({ setState, setBtn }) => {
  setState("Registration Form");
  setBtn("Register");

  const handleClick = () => console.log("you clicked me");

  return (
    <Form>
      {button(handleClick, "Click here to Login?", "link")}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label column={true}>Username</Form.Label>
        <Form.Control type="text" placeholder="my name" autoFocus={true} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label column={true}>Password</Form.Label>
        <Form.Control type="password" placeholder="your password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlPassword1">
        <Form.Label column={true}>Re-type Password</Form.Label>
        <Form.Control type="password" placeholder="re-type password" />
      </Form.Group>
    </Form>
  );
};

export default Registration;

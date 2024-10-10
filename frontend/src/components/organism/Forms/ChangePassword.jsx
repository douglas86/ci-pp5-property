import Form from "react-bootstrap/Form";
import { button } from "../../atom/button";

const ChangePassword = ({ setState, setBtn }) => {
  setState("Change Password");
  setBtn("Change");

  const handleClick = () => console.log("You clicked me");

  return (
    <Form>
      {button(handleClick, "Click here to Login?", "link")}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label column={true}>Username</Form.Label>
        <Form.Control type="text" placeholder="my name" autoFocus={true} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label column={true}>Your Password</Form.Label>
        <Form.Control type="password" placeholder="your password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label column={true}>New Password</Form.Label>
        <Form.Control type="password" placeholder="change password here" />
      </Form.Group>
      {button(handleClick, "Click here to Register?", "link")}
    </Form>
  );
};

export default ChangePassword;

import { button } from "../../atom/button";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import useAppContext from "../../../hooks/useAppContext";
import MapToForm from "../../molecule/mapToForm";

const Login = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    // change the header of the modal
    dispatch({ type: "CHANGE HEADER", payload: "Login Form" });
    // change the submit button text on modal
    dispatch({ type: "CHANGE BTN", payload: "Login" });
    // change the url needed for the submitted button
    dispatch({ type: "FORM SUBMIT URL", payload: "/auth/login/" });
  }, [dispatch]);

  const handleClick = () => console.log("You clicked me");

  // array to be passed to map
  // details of what you want in the form
  // it must always have name, type, placeholder
  // the id value is just for the map as it always needs a key
  const arr = [
    { id: 1, name: "username", type: "text", placeholder: "Your Username" },
    { id: 2, name: "password", type: "password", placeholder: "YOur Password" },
  ];

  return (
    <Form>
      {button(handleClick, "Click here to Register?", "link")}
      {arr.map(({ id, name, type, placeholder }) => (
        <MapToForm key={id} name={name} type={type} placeholder={placeholder} />
      ))}
      {button(handleClick, "Click here to change password?", "link")}
    </Form>
  );
};

export default Login;

import Form from "react-bootstrap/Form";
import { button } from "../../atom/button";
import { useEffect } from "react";
import useAppContext from "../../../hooks/useAppContext";

import MapToForm from "../../molecule/mapToForm";

const Registration = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    // change the header of the modal
    dispatch({ type: "CHANGE HEADER", payload: "Registration Form" });
    // change the submit button text on modal
    dispatch({ type: "CHANGE BTN", payload: "Registration" });
    // change the url needed for the submitted button
    dispatch({
      type: "FORM SUBMIT URL",
      payload: "/dj-rest-auth/registration/",
    });
  }, [dispatch]);

  const handleClick = () => console.log("you clicked me");

  // array to be passed to map
  // details of what you want in the form
  // it must always have name, type, placeholder
  // the id value is just for the map as it always needs a key
  const arr = [
    { id: 1, name: "username", type: "text", placeholder: "Your Username" },
    {
      id: 2,
      name: "password1",
      type: "password",
      placeholder: "Your Password",
    },
    {
      id: 3,
      name: "password2",
      type: "password",
      placeholder: "Re-type Password",
    },
  ];

  return (
    <Form>
      {button(handleClick, "Click here to Login?", "link")}
      {arr.map(({ id, name, type, placeholder }) => (
        <MapToForm key={id} name={name} type={type} placeholder={placeholder} />
      ))}
    </Form>
  );
};

export default Registration;

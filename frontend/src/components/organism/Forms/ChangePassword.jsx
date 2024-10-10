import Form from "react-bootstrap/Form";
import { button } from "../../atom/button";
import { useEffect } from "react";
import useAppContext from "../../../hooks/useAppContext";
import MapToForm from "../../molecule/mapToForm";

import styles from "../../../styles/components/organism/Forms.module.css";

const ChangePassword = () => {
  const { dispatch, forms } = useAppContext();
  const { errors } = forms;

  useEffect(() => {
    // change the header of the modal
    dispatch({ type: "CHANGE HEADER", payload: "Change Password Form" });
    // change the submit button text on modal
    dispatch({ type: "CHANGE BTN", payload: "Change Password" });
    // change the url needed for the submitted button
    dispatch({ type: "FORM SUBMIT URL", payload: "/auth/change_password/" });
  }, [dispatch]);

  const handleLogin = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "" });

  const handleRegister = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "REGISTRATION" });

  const arr = [
    { id: 1, name: "username", type: "text", placeholder: "Your Username" },
    {
      id: 2,
      name: "old_password",
      type: "password",
      placeholder: "Your Password",
    },
    {
      id: 3,
      name: "new_password",
      type: "password",
      placeholder: "Re-type Password",
    },
  ];

  return (
    <Form>
      {button(handleLogin, "Click here to Login?", "link")}
      {arr.map(({ id, name, type, placeholder }) => (
        <MapToForm key={id} name={name} type={type} placeholder={placeholder} />
      ))}
      <p className={styles.errors}>{errors["message"]}</p>
      {button(handleRegister, "Click here to Register?", "link")}
    </Form>
  );
};

export default ChangePassword;

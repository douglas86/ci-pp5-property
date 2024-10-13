import Form from "react-bootstrap/Form";
import { button, spinner } from "../../atom";
import { useEffect } from "react";
import useAppContext from "../../../hooks/useAppContext";
import MapToForm from "../../molecule/mapToForm";
import { onSubmit } from "../../../utils";

import styles from "../../../styles/components/organism/Forms.module.css";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const { dispatch, forms } = useAppContext();
  const { loading, err } = forms;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const commonPasswords = ["123456", "password", "12345678", "qwerty"];

  const arr = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Your Username",
      formValidation: { required: "This field is required" },
    },
    {
      id: 2,
      name: "old_password",
      type: "password",
      placeholder: "Your Password",
      formValidation: { required: "This field is required" },
    },
    {
      id: 3,
      name: "new_password",
      type: "password",
      placeholder: "Re-type Password",
      formValidation: {
        required: "This field is required",
        minLength: {
          value: 8,
          message:
            "This password is too short. It must contain at least 8 characters",
        },
        validate: {
          common: (value) =>
            !commonPasswords.includes(value) || "This password is too common",
          numeric: (value) =>
            !/^\d+$/.test(value) || "This password is entirely numeric",
        },
      },
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit((data) =>
        onSubmit(data, "/auth/change_password/", dispatch),
      )}
    >
      {loading ? spinner() : null}

      <div className={styles.btn}>
        {button(handleRegister, "Click here to Register?", "secondary")}
        {button(handleLogin, "Login Here?", "primary")}
      </div>

      {arr.map((items) => (
        <MapToForm
          key={items.id}
          items={items}
          errors={errors}
          register={register}
        />
      ))}

      <div className={styles.btn}>
        {button(
          () => dispatch({ type: "", payload: false }),
          "Cancel",
          "secondary",
        )}
        {button("submit", "Change Password", "warning")}
      </div>

      {err["message"] && <p className="text-danger">{err["message"]}</p>}
    </Form>
  );
};

export default ChangePassword;

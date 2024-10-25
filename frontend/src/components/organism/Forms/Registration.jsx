// 3rd party
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// atomic design
import MapToForm from "../../molecule/MapToForm";
import { button, spinner } from "../../atom";

// utils and custom hooks
import useAppContext from "../../../hooks/useAppContext";
import { onSubmit } from "../../../utils";

// styling
import styles from "../../../styles/components/organism/Forms.module.css";

/**
 * Registration Form currently being used for displaying in the modal
 * @returns {JSX.Element}
 * @constructor
 */
const Registration = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { loading } = forms;

  // React hook forms functions
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // change the header of the modal
    dispatch({ type: "CHANGE HEADER", payload: "Registration Form" });
    // change the submit button text on modal
    dispatch({ type: "CHANGE BTN", payload: "Registration" });
    // change the url needed for the submitted button
    dispatch({
      type: "FORM SUBMIT URL",
      payload: "auth/registration/",
    });
  }, [dispatch]);

  // Login user form will load
  const handleLogin = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "" });

  // password checking
  const passwordMatch = watch("password1");
  const commonPasswords = ["123456", "password", "12345678", "qwerty"];

  // array used for MapToForm molecule
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
      name: "password1",
      type: "password",
      placeholder: "Your Password",
      formValidation: {
        required: "This field is required",
        minLength: {
          value: 8,
          message:
            "This password is too short. It must contain at least 8 characters",
        },
        validate: {
          // validation to check if password is not too common
          // and for checking if password is not all numeric
          common: (value) =>
            !commonPasswords.includes(value) || "This password is too common",
          numeric: (value) =>
            !/^\d+$/.test(value) || "This password is entirely numeric",
        },
      },
    },
    {
      id: 3,
      name: "password2",
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
          // validates if passwords match, common passwords and password is not all numeric
          match: (value) => value === passwordMatch || "Passwords do not match",
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
        onSubmit(data, "auth/registration/", dispatch),
      )}
    >
      {loading ? spinner() : null}

      <div className={styles.btn}>
        {button(handleLogin, "Login Here?", "primary")}
      </div>

      {arr.map(({ id, name, type, placeholder, formValidation }) => (
        <MapToForm
          key={id}
          name={name}
          type={type}
          placeholder={placeholder}
          formValidation={formValidation}
          errors={errors}
          register={register}
        />
      ))}

      {/*close modal or login buttons*/}
      <div className={styles.btn}>
        {button(
          () => dispatch({ type: "CHANGE MODAL STATE", payload: false }),
          "Cancel",
          "secondary",
        )}
        {button("submit", "Register", "warning")}
      </div>
    </Form>
  );
};

export default Registration;

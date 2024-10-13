// 3rd party
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// atomic design
import MapToForm from "../../molecule/mapToForm";
import { button, spinner } from "../../atom";

// utils and custom hooks
import { onSubmit } from "../../../utils";
import useAppContext from "../../../hooks/useAppContext";

// styling
import styles from "../../../styles/components/organism/Forms.module.css";

const Registration = () => {
  const { dispatch, forms } = useAppContext();
  const { loading } = forms;

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
      payload: "/auth/registration/",
    });
  }, [dispatch]);

  const handleLogin = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "" });

  // password checking
  const passwordMatch = watch("password1");
  const commonPasswords = ["123456", "password", "12345678", "qwerty"];

  // description of arr
  // id - this is only used for the map, must be a unique id
  // name, type and placeholder attributes for Form.Control elements
  // formValidation - used for React hook forms to validate data in form
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
        onSubmit(data, "/auth/registration/", dispatch),
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
        {button("submit", "Login", "warning")}
      </div>
    </Form>
  );
};

export default Registration;

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
 * Change a Password form this is being displayed inside the modal
 * @returns {JSX.Element}
 * @constructor
 */
const ChangePassword = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { loading, err } = forms;

  // React hook form functions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // change the header of the modal
    dispatch({ type: "CHANGE HEADER", payload: "Change Password Form" });
  }, [dispatch]);

  // load login form
  const handleLogin = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "" });

  // load register form
  const handleRegister = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "REGISTRATION" });

  // password checking
  const commonPasswords = ["123456", "password", "12345678", "qwerty"];

  // array for MapToForm molecule
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
          // Validation to check that password is not too common or all numeric
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
      {/*Display spinner when waiting for server response*/}
      {loading ? spinner() : null}

      {/*Buttons to link back to Register and Login Form*/}
      <div className={styles.btn}>
        {button(handleRegister, "Click here to Register?", "secondary")}
        {button(handleLogin, "Login Here?", "primary")}
      </div>

      {/*displaying of Form Control input elements and error messages*/}
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

      {/*Cancel and Submit buttons*/}
      <div className={styles.btn}>
        {button(
          () => dispatch({ type: "CHANGE MODAL STATE", payload: false }),
          "Cancel",
          "secondary",
        )}
        {button("submit", "Change Password", "warning")}
      </div>

      {/*display an error message only if they occur*/}
      {err["message"] && <p className="text-danger">{err["message"]}</p>}
    </Form>
  );
};

export default ChangePassword;

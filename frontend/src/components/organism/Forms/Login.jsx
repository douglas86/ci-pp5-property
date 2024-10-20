// 3rd party
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

// atomic design
import MapToForm from "../../molecule/MapToForm";
import { button, spinner } from "../../atom";

// utils and custom hooks
import { onSubmit } from "../../../utils";
import useAppContext from "../../../hooks/useAppContext";

// styling
import styles from "../../../styles/components/organism/Forms.module.css";

/**
 * Login Form this is currently for being displayed in the modal
 * @returns {JSX.Element}
 * @constructor
 */
const Login = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { loading } = forms;

  // React hook form functions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // change modal header on component mounting
  useEffect(() => {
    // change the header of the modal
    dispatch({ type: "CHANGE HEADER", payload: "Login Form" });
  }, [dispatch]);

  // function to change to the register form
  const handleRegister = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "REGISTRATION" });

  // function to change to the change password form
  const handleChangePassword = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "CHANGE PASSWORD" });

  // array used for MapToForm Molecule
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
      name: "password",
      type: "password",
      placeholder: "Your Password",
      formValidation: { required: "This field is required" },
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit((data) => onSubmit(data, "auth/login/", dispatch))}
    >
      {/*Display spinner when waiting for server response*/}
      {loading ? spinner() : null}

      {/*register and change password buttons*/}
      <div className={styles.btn}>
        {button(handleRegister, "Click here to Register?", "secondary")}
        {button(handleChangePassword, "Change Password Here?", "primary")}
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

      {/*Cancel and login buttons*/}
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

export default Login;

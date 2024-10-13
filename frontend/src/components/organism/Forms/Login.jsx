// 3rd party
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

// atomic design
import MapToForm from "../../molecule/mapToForm";
import { button, spinner } from "../../atom";

// utils and custom hooks
import { onSubmit } from "../../../utils";
import useAppContext from "../../../hooks/useAppContext";

// styling
import styles from "../../../styles/components/organism/Forms.module.css";

const Login = () => {
  const { dispatch, forms } = useAppContext();
  const { loading } = forms;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // change the header of the modal
    dispatch({ type: "CHANGE HEADER", payload: "Login Form" });
  }, [dispatch]);

  const handleRegister = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "REGISTRATION" });

  const handleChangePassword = () =>
    dispatch({ type: "WHICH FORM TO USE", payload: "CHANGE PASSWORD" });

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
      name: "password",
      type: "password",
      placeholder: "Your Password",
      formValidation: { required: "This field is required" },
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit((data) =>
        onSubmit(data, "/auth/login/", dispatch),
      )}
    >
      {/*display message based on server response*/}
      {loading ? spinner() : null}

      {/*register and change password buttons*/}
      <div className={styles.btn}>
        {button(handleRegister, "Click here to Register?", "secondary")}
        {button(handleChangePassword, "Change Password Here?", "primary")}
      </div>

      {/*form groups*/}
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

export default Login;

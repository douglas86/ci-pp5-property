import { button } from "../../atom/button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import useAppContext from "../../../hooks/useAppContext";
import MapToForm from "../../molecule/mapToForm";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { AxiosRegister } from "../../../API/AxiosInstance";

const Login = () => {
  const { dispatch } = useAppContext();

  const [loading, setLoading] = useState("");

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

  const onSubmit = async (data) => {
    setLoading("Please wait while we process your data?");

    await AxiosRegister.post("/auth/login/", data)
      .then((res) => {
        // save data to success forms state in state store
        dispatch({ type: "FORM SUCCESS", payload: res });
        // save users data to the users state in state store
        dispatch({ type: "USER DATA", payload: res.data.user });
        // when data has been processed close form and reset loading state
        setLoading("");
      })
      .catch((err) => {
        // when errors occur, it gets save to forms errors state in state store
        dispatch({ type: "FORM ERRORS", payload: err.response.data });
      });
  };

  // array to be passed to map
  // details of what you want in the form
  // it must always have name, a type; placeholder
  // formValidation is for React hook forms validation
  // the id value is just for the map as it always needs a key
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/*display message based on server response*/}
      <h3>{loading}</h3>

      {/*register and change password buttons*/}
      {button(handleRegister, "Click here to Register?", "secondary")}
      {button(handleChangePassword, "Change Password Here?", "primary")}

      {arr.map((items) => (
        <MapToForm
          key={items.id}
          items={items}
          errors={errors}
          register={register}
        />
      ))}

      <Button type="submit" variant="warning">
        Login
      </Button>
    </Form>
  );
};

export default Login;

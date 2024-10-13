import Form from "react-bootstrap/Form";
import { button, spinner } from "../../atom";
import { useEffect, useState } from "react";
import useAppContext from "../../../hooks/useAppContext";

import MapToForm from "../../molecule/mapToForm";
import { AxiosRegister } from "../../../API/AxiosInstance";
import { useForm } from "react-hook-form";
import styles from "../../../styles/components/organism/Forms.module.css";

const Registration = () => {
  const { dispatch } = useAppContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    setLoading(true);

    await AxiosRegister.post("/auth/registration/", data)
      .then((res) => {
        dispatch({ type: "FORM SUCCESS", payload: res });
        dispatch({ type: "USER DATA", payload: res.data.user });
        dispatch({ type: "CHANGE MODAL STATE", payload: false });
      })
      .catch((err) => {
        dispatch({ type: "FORM ERRORS", payload: err.response.data });
        console.log("err", err);
      });

    setLoading(false);
  };

  const password = watch("password1");
  const commonPasswords = ["123456", "password", "12345678", "qwerty"];

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
          passwordMatch: (value) =>
            value === password || "Passwords do not match",
          common: (value) =>
              !commonPasswords.includes(value) || "This password is too common",
          numeric: (value) =>
              !/^\d+$/.test(value) || "This password is entirely numeric",
        },
      },
    },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {loading ? spinner() : null}

      {button(handleLogin, "Click here to Login?", "link")}

      {arr.map((items) => (
        <MapToForm
          key={items.id}
          items={items}
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

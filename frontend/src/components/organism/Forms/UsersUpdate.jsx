// 3rd parties
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

// atomic design
import MapToFormUpdate from "../../molecule/MapToFormUpdate";
import { button, spinner } from "../../atom";

// custom hooks
import useAppContext from "../../../hooks/useAppContext";

// styling
import styles from "../../../styles/components/organism/Forms.module.css";

const UsersUpdate = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { loading, view } = forms;

  // destructuring view
  const { user, area_code, address, rent, profile_picture, role } = view;

  // React hook forms functions
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user,
      area_code,
      address,
      rent,
      profile_picture,
      role,
    },
  });

  // update dispatch on component mount
  useEffect(() => {
    // change the header of the modal
    dispatch({
      type: "CHANGE HEADER",
      payload: `You are about to update ${user}'s details`,
    });
    // change the submit button text on modal
    dispatch({ type: "CHANGE BTN", payload: "Update User" });
    // change the url needed for the submitted button
    // TODO: this endpoint has not been created yet
  }, [dispatch]);

  const onSubmit = (data) => console.log("data", data);

  // array used for MapToFormUpdate Molecule
  const arr = [
    {
      id: 1,
      name: "username",
      type: "text",
      formValidation: { required: "This field is required" },
    },
    {
      id: 2,
      name: "area_code",
      type: "text",
      formValidation: { required: "This field is required" },
    },
    {
      id: 3,
      name: "address",
      type: "text",
      formValidation: { required: "This field is required" },
    },
    {
      id: 4,
      name: "rent",
      type: "text",
      formValidation: { required: "This field is required" },
    },
    {
      id: 5,
      name: "profile_picture",
      type: "file",
      autoFocus: true,
    },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {loading ? spinner() : null}

      {/*molecule for input fields on form*/}
      {arr.map(({ id, name, type, formValidation }) => (
        <MapToFormUpdate
          key={id}
          name={name}
          type={type}
          formValidation={formValidation}
          control={control}
          errors={errors}
          register={register}
        />
      ))}

      {/*cancel and update buttons*/}
      <div className={styles.btn}>
        {button(
          () => dispatch({ type: "CHANGE MODAL STATE", payload: false }),
          "Cancel",
          "secondary",
        )}
        {button("submit", "Update User", "primary")}
      </div>
    </Form>
  );
};

export default UsersUpdate;

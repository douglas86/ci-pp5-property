// 3rd parties
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

// atomic design
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
    watch,
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

  console.log("view", view);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {loading ? spinner() : null}
      <Form.Group className="mb-3" controlId={user}>
        <Form.Label column={true}>Username</Form.Label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Form.Control
              type="text"
              {...register("username", { required: true })}
              autoFocus={true}
              name="username"
              {...field}
            />
          )}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId={area_code}>
        <Form.Label column={true}>Area Code</Form.Label>
        <Controller
          name="Postal code"
          control={control}
          render={({ field }) => (
            <Form.Control
              type="text"
              {...register("area_code", { required: true })}
              autoFocus={true}
              name="area_code"
              placeholder="Unknown"
              {...field}
            />
          )}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId={address}>
        <Form.Label column={true}>Address</Form.Label>
        <Controller
          name="Address"
          control={control}
          render={({ field }) => (
            <Form.Control
              type="text"
              {...register("address", { required: true })}
              autoFocus={true}
              name="address"
              placeholder="Unknown"
              {...field}
            />
          )}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId={rent}>
        <Form.Label column={true}>Rent - £/month</Form.Label>
        <Controller
          name="rent"
          control={control}
          render={({ field }) => (
            <Form.Control
              type="text"
              {...register("rent", { required: true })}
              autoFocus={true}
              name="rent"
              placeholder="Unknown"
              {...field}
            />
          )}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId={profile_picture}>
        <Form.Label column={true}>Profile Picture</Form.Label>
        {profile_picture && (
          <Image src={profile_picture} width={50} height={50} roundedCircle />
        )}
        <Controller
          name="profile_picture"
          control={control}
          render={({ field }) => (
            <Form.Control
              type="file"
              onChange={(e) => field.onChange(e.target.files[0])}
              autoFocus={true}
              name="profile_picture"
              placeholder="Unknown"
            />
          )}
        />
      </Form.Group>
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

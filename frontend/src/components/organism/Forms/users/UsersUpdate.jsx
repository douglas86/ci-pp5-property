// 3rd parties
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

// atomic design
import MapToFormController from "../../../molecule/MapToFormController";
import { button, spinner } from "../../../atom";

// custom hooks and utils
import useAppContext from "../../../../hooks/useAppContext";
import useFetch from "../../../../hooks/useFetch";
import { onUpdate } from "../../../../utils";

// styling
import styles from "../../../../styles/components/organism/Forms.module.css";

/**
 * Updating the users information in the database form
 * @returns {JSX.Element}
 * @constructor
 */
const UsersUpdate = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { loading, view } = forms;

  // destructuring view
  const { id, user, area_code, address, rent, profile_picture, role } = view;

  // React hook forms functions
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
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

  // filtered data from server based on area_code
  const areaCode = watch("area_code");
  const { data } = useFetch(`properties/filter?area_code=${areaCode}`);

  useEffect(() => {
    // change the header of the modal
    dispatch({
      type: "CHANGE HEADER",
      payload: `You are about to update ${user}'s details`,
    });
  }, [dispatch, user]);

  // array used for MapToFormController Molecule
  const arr = [
    {
      id: 1,
      name: "username",
      type: "text",
      formValidation: { required: "This field is required" },
    },
    {
      id: 2,
      name: "profile_picture",
      type: "file",
      autoFocus: true,
    },
    {
      id: 3,
      name: "area_code",
      type: "text",
      formValidation: {
        required: "This field is required",
        validate: (value) => {
          // 1. Check if 'data' is an array and if it's empty
          if (!Array.isArray(data) && data.length > 0) {
            return "You have not selected anything from the db";
          }
          // 2. Check if 'value' is in the database array or is not equal to None
          const isInDatabase = data.some(
            (obj) => obj["area_code"]?.toLowerCase() === value.toLowerCase(),
          );
          if (!isInDatabase && value !== "None") {
            return "You must select a value from the database or it must be None";
          }
          // If all validations pass, return true (valid input)
          return true;
        },
      },
    },
  ];

  // setValues of area_code, address and prices to correct value on click
  const handleValues = (area_code, address, price) => {
    setValue("area_code", area_code);
    setValue("address", address);
    setValue("rent", price);
  };

  // update users data on submit
  const onSubmit = (data) => {
    const formData =
      data.area_code === "None"
        ? { area_code: "None", address: "None", rent: 0 }
        : data;

    onUpdate(formData, `profile/update/${id}/`, dispatch);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/*show loading symbol based on server response*/}
      {loading ? spinner() : null}

      {/*molecule for input fields on form*/}
      {arr.map(({ id, name, type, formValidation }) => (
        <MapToFormController
          key={id}
          name={name}
          type={type}
          formValidation={formValidation}
          control={control}
          errors={errors}
          register={register}
        />
      ))}

      {/*display area_codes on correct data*/}
      {data
        ? data.map(({ id, area_code, address, price }) => (
            <div key={id}>
              {button(
                () => handleValues(area_code, address, price),
                `${area_code} - address: ${address}`,
                "light",
              )}
            </div>
          ))
        : null}

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

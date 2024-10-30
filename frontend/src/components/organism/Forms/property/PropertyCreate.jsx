// 3rd party
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

// atomic design
import MapToFormUpdate from "../../../molecule/MapToFormUpdate";
import { button, spinner } from "../../../atom";

// custom hooks
import useAppContext from "../../../../hooks/useAppContext";

// styling
import styles from "../../../../styles/components/organism/Forms.module.css";

/**
 * This form is used for creating a new property
 * @returns {JSX.Element}
 * @constructor
 */
const PropertyCreate = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { loading } = forms;

  // React hook forms
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // load on component mount
  useEffect(() => {
    // change modal header
    dispatch({ type: "CHANGE HEADER", payload: "Create a new Property" });
  }, [dispatch]);

  // send data to endpoint when ready
  // TODO: Once endpoint is setup then I can create the logic for this
  const onSubmit = (data) => {
    console.log("data", data);
  };

  // array used for MapToFormUpdate molecule
  let arr = [
    {
      id: 1,
      name: "price per month",
      type: "number",
      placeholder: "price per month",
      formValidation: {
        required: "This field is required",
        min: { value: 0, message: "number must be more than £0" },
        max: { value: 2000, message: "number must be less than £2000" },
      },
    },
    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "description of property",
      formValidation: {
        required: "This field is required",
      },
    },
    {
      id: 3,
      name: "place",
      type: "text",
      placeholder: "Where the property is located",
      formValidation: {
        required: "This field is required",
      },
    },
    {
      id: 4,
      name: "area_code",
      type: "text",
      placeholder: "Postal code of the area",
      formValidation: {
        required: "This field is required",
      },
    },
    {
      id: 5,
      name: "image",
      type: "file",
      placeholder: "Please select a picture of the property",
      formValidation: {
        required: "This field is required",
      },
    },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/*show loading symbol based on server response*/}
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
        {button("submit", "Create Property", "warning")}
      </div>
    </Form>
  );
};

export default PropertyCreate;

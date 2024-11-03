// 3rd party
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

// atomic design
import MapToFormController from "../../../molecule/MapToFormController";
import { button, spinner } from "../../../atom";

// custom hooks and utils
import useAppContext from "../../../../hooks/useAppContext";
import { onSubmit } from "../../../../utils";

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
    // reset a view object in forms state store
    dispatch({ type: "RESET FORM VIEW", payload: {} });
  }, [dispatch]);

  // array used for MapToFormController molecule
  let arr = [
    {
      id: 1,
      name: "price",
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
      name: "address",
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
    <Form
      onSubmit={handleSubmit((data) =>
        onSubmit(data, "properties/create/", dispatch, false),
      )}
    >
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

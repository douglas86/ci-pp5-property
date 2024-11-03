import useAppContext from "../../../../hooks/useAppContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { button, spinner } from "../../../atom";
import MapToFormController from "../../../molecule/MapToFormController";
import styles from "../../../../styles/components/organism/Forms.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { server } from "../../../../utils";

const PropertyUpdate = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { loading, view } = forms;
  const { id, address, description, image, price, area_code } = view;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address,
      description,
      image,
      price,
      area_code,
    },
  });

  console.log("view", view);

  // load on component mount
  useEffect(() => {
    // change modal header
    dispatch({
      type: "CHANGE HEADER",
      payload: `You are about to update: ${address}`,
    });
  }, [dispatch, address]);

  const onSubmit = (data) => {
    dispatch({ type: "FORM LOADING", payload: true });

    const putData = async () => {
      try {
        return axios.put(`${server}/properties/update/${id}/`, data, {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth-token")}`,
            "X-Refresh-Token": Cookies.get("refresh-token"),
          },
        });
      } catch (e) {
        return e;
      }
    };

    putData()
      .then((res) => {
        // hide loading spinner on server response
        dispatch({ type: "FORM LOADING", payload: false });
        // save data response to state store
        dispatch({ type: "FORM SUCCESS", payload: res.data });
        // hide modal
        dispatch({ type: "CHANGE MODAL STATE", payload: false });
        // refresh data when server is successful
        dispatch({ type: "FORM REFRESH FLAG", payload: true });
        // display alert message
        dispatch({ type: "SUCCESSFUL MESSAGE", payload: res.data.message });
      })
      .catch((err) => {
        // passing error messages to the state store,
        // these error messages get returned to the user on the current form when the modal is showing
        dispatch({ type: "FORM ERRORS", payload: err.response.data });
      });
  };

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      {loading ? spinner() : null}

      {arr.map(({ id, name, type, placeholder, formValidation }) => (
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
        {button("submit", "Update Property", "warning")}
      </div>
    </Form>
  );
};

export default PropertyUpdate;

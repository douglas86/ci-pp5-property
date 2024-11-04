// 3rd parties
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

// atomic design
import MapToFormController from "../../../molecule/MapToFormController";
import { button, spinner } from "../../../atom";

// custom hooks
import useAppContext from "../../../../hooks/useAppContext";

// styling
import styles from "../../../../styles/components/organism/Forms.module.css";
import axios from "axios";
import { server } from "../../../../utils";
import Cookies from "js-cookie";
import useFetch from "../../../../hooks/useFetch";

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

  // update dispatch on component mount
  useEffect(() => {
    // change the header of the modal
    dispatch({
      type: "CHANGE HEADER",
      payload: `You are about to update ${user}'s details`,
    });
  }, [dispatch, user]);

  const onSubmit = (data) => {
    // show loading spinner
    dispatch({ type: "FORM LOADING", payload: true });

    const putData = async () => {
      try {
        return axios.put(`${server}/profile/update/${id}/`, data, {
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
          if (Array.isArray(data) && data.length > 0 && value !== "None") {
            return "You have not selected anything from the db";
          }
          // 2. Check if 'value' is a string, and it should be "None" if not in database
          if (typeof value === "string" && value !== "None") {
            return "The value must be None if not in database";
          }
          // 3. check if 'value' is in the database array
          const isInDatabase = data.some(
            (obj) => obj["area_code"]?.toLowerCase() === value.toLowerCase(),
          );
          if (!isInDatabase && value !== "None") {
            return "You must select a value from the database";
          }
          // If all validations pass, return true (valid input)
          return true;
        },
      },
    },
  ];

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

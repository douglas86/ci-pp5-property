import axios from "axios";
import { server } from "./apiSettings";
import Cookies from "js-cookie";

const onDelete = (e, url, dispatch) => {
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      return await axios.delete(`${server}/${url}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth-token")}`,
          "X-Refresh-Token": Cookies.get("refresh-token"),
        },
      });
    } catch (e) {
      return e;
    }
  };

  onSubmit(e)
    .then((res) => {
      // save data to success forms state in state store
      dispatch({ type: "FORM SUCCESS", payload: res });
      // close modal when data is correct from server
      dispatch({ type: "CHANGE MODAL STATE", payload: false });
      // refresh data on successful delete
      dispatch({ type: "FORM REFRESH FLAG", payload: true });
    })
    .catch((err) => {
      // passing error messages to the state store,
      // these error messages get returned to the user on the current form when the modal is showing
      dispatch({ type: "FORM ERRORS", payload: err.response.data });
    });

  // axios
  //   .delete(`${server}/${url}`, {
  //     headers: {},
  //   })
  //   .then((res) => {
  //     // save data to success forms state in state store
  //     dispatch({ type: "FORM SUCCESS", payload: res });
  //     // close modal when data is correct from server
  //     dispatch({ type: "CHANGE MODAL STATE", payload: false });
  //     // refresh data on successful delete
  //     dispatch({ type: "FORM REFRESH FLAG", payload: true });
  //   })
  //   .catch((err) => {
  //     // passing error messages to the state store,
  //     // these error messages get returned to the user on the current form when the modal is showing
  //     dispatch({ type: "FORM ERRORS", payload: err.response.data });
  //   });
};

export default onDelete;

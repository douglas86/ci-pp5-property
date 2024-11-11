// 3rd party
import axios from "axios";
import Cookies from "js-cookie";

// utilities
import { server } from "./apiSettings";

/**
 * helper function used to delete data from server
 * @param e
 * @param url
 * @param dispatch
 */
export const onDelete = (e, url, dispatch) => {
  // display loading symbol on server request
  dispatch({ type: "FORM LOADING", payload: true });

  // async function for submission
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
      // show a successful message
      dispatch({ type: "SUCCESSFUL MESSAGE", payload: res.data.message });
    })
    .catch((err) => {
      // passing error messages to the state store,
      // these error messages get returned to the user on the current form when the modal is showing
      dispatch({ type: "FORM ERRORS", payload: err.response.data });
    });

  // hide loading symbol on server response
  dispatch({ type: "FORM LOADING", payload: false });
};

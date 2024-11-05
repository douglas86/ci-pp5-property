// 3rd parties
import axios from "axios";
import Cookies from "js-cookie";

// utils
import { server } from "./apiSettings";

/**
 * Helper function used to update data to server
 * @param data
 * @param url
 * @param dispatch
 */
export const onUpdate = (data, url, dispatch) => {
  // display loading symbol on server request
  dispatch({ type: "FORM LOADING", payload: true });

  // async function for updating
  const putData = async () => {
    try {
      return axios.put(`${server}/${url}`, data, {
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

  // hide loading symbol on server response
  dispatch({ type: "FORM LOADING", payload: false });
};

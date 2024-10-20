// 3rd parties
import axios from "axios";
import Cookies from "js-cookie";

// utils
import { server } from "./apiSettings";

/**
 * Helper function used for forms when submitting data between React to Django
 * @param data
 * @param url
 * @param dispatch
 * @returns {Promise<void>}
 */
export const onSubmit = async (data, url, dispatch) => {
  // display loading symbol on server request
  dispatch({ type: "FORM LOADING", payload: true });
  const refresh = Cookies.get("refresh-token");

  // if refresh token exists, send data and refresh token to server
  // if refresh token does not exist, send only data to server
  const formData = refresh ? { data, refresh } : data;

  await axios
    .post(`${server}/${url}`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("auth-token")}`,
        "X-Refresh-Token": Cookies.get("refresh-token"),
      },
    })
    .then((res) => {
      // variable for response from server
      const results = res.data;

      // save data to success forms state in state store
      dispatch({ type: "FORM SUCCESS", payload: res });
      // save users data to the users state in state store
      dispatch({ type: "USER DATA", payload: res.data.user });
      // close modal when data is correct from server
      dispatch({ type: "CHANGE MODAL STATE", payload: false });

      // This is what is returned when user logs out
      //   this will be used for the displaying of alert messages
      if (results.detail) {
        dispatch({ type: "SUCCESSFUL MESSAGE", payload: results.detail });
        Cookies.remove("refresh-token");
        Cookies.remove("auth-token");
      }

      // Logic to handle loging in user
      //   this logic will be used for the displaying of alert messages on successful login
      results.user &&
        dispatch({
          type: "SUCCESSFUL MESSAGE",
          payload: "You have Logged in Successfully!",
        });

      // Everything else
      //   When the Logout and Login have not been successfully this will occur
      if (results.message) {
        dispatch({ type: "SUCCESSFUL MESSAGE", payload: results.message });
        Cookies.remove("refresh-token");
        Cookies.remove("auth-token");
      }
    })
    .catch((err) => {
      // passing error messages to the state store,
      // these error messages get returned to the user on the current form when the modal is showing
      dispatch({ type: "FORM ERRORS", payload: err.response.data });
    });

  // Reset form if refresh token exists
  if (refresh) {
    // Reset form after 5 seconds
    setTimeout(() => {
      dispatch({ type: "RESET FORM" });
    }, 5000);
  }

  // hide loading symbol on server response
  dispatch({ type: "FORM LOADING", payload: false });
};

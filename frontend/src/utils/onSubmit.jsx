import { AxiosRegister } from "../API/AxiosInstance";

export const onSubmit = async (data, url, dispatch) => {
  // display loading symbol on server request
  dispatch({ type: "FORM LOADING", payload: true });

  await AxiosRegister.post(url, data)
    .then((res) => {
      const results = res.data;

      // save data to success forms state in state store
      dispatch({ type: "FORM SUCCESS", payload: res });
      // save users data to the users state in state store
      dispatch({ type: "USER DATA", payload: res.data.user });
      // close modal when data is correct from server
      dispatch({ type: "CHANGE MODAL STATE", payload: false });

      // This is what is returned when user logs out
      results.detail &&
        dispatch({ type: "SUCCESSFUL MESSAGE", payload: results.detail });

      // Logic to handle loging in user
      results.user &&
        dispatch({
          type: "SUCCESSFUL MESSAGE",
          payload: "You have Logged in Successfully!",
        });

      // Everything else
      results.message &&
        dispatch({ type: "SUCCESSFUL MESSAGE", payload: results.message });

      setTimeout(() => {
        dispatch({ type: "RESET FORM" });
      }, 5000);
    })
    .catch((err) => {
      dispatch({ type: "FORM ERRORS", payload: err.response.data });
    });

  // hide loading symbol on server response
  dispatch({ type: "FORM LOADING", payload: false });
};

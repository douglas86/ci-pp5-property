// 3rd parties
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// api and custom hooks
import AxiosInstance from "../API/AxiosInstance";
import useAppContext from "./useAppContext";

/**
 * Custom hook responsible for handling auth tokens of the current logged-in user
 */
const useTokens = () => {
  // setting auth token
  const [authToken, setAuthToken] = useState(null);
  // setting of refresh token
  const [refreshToken, setRefreshToken] = useState(null);

  // state store
  const { dispatch, forms, modal } = useAppContext();
  const { success } = forms;
  const { header } = modal;

  // store auth and refresh to Cookies on Login and Registration
  useEffect(() => {
    // function to save refresh token to browser cookie store
    const storeRefreshToken = (token) => {
      Cookies.set("refresh-token", token, { expires: 7 });
    };

    // function to save auth token to browser cookie store
    const storeAuthToken = (token) => {
      Cookies.set("auth-token", token, { expires: 7 });
    };

    // Ensure `success` has valid data before attempting to store tokens
    // Ensure that the modal header is set to Log in Form
    if (header === "Login Form" && success?.data) {
      // Store refresh token if available
      if (success.data.refresh) {
        storeRefreshToken(success.data.refresh);
      }

      // Store auth token if available
      if (success.data.access) {
        storeAuthToken(success.data.access);
      }
    }

    // Ensure that the modal header is set to Registration Form
    if (header === "Registration Form" && success?.data) {
      if (success.data.refresh) {
        storeRefreshToken(success.data.refresh);
      }

      if (success.data.access) {
        storeAuthToken(success.data.access);
      }
    }

    // Ensure that the modal header is set to Log out Form
    if (header === "Logout Form" && success?.data) {
      const { detail } = success.data;

      if (detail && detail === "Successfully logged out.") {
        Cookies.remove("refresh-token");
        Cookies.remove("auth-token");
        dispatch({ type: "USER DATA", payload: null });
      }
    }
  }, [dispatch, success, header]);

  // check when auth and token cookies are available for use
  // check on mount then check every second
  useEffect(() => {
    const checkCookies = () => {
      const refresh = Cookies.get("refresh-token");
      const auth = Cookies.get("auth-token");
      setRefreshToken(refresh);
      setAuthToken(auth);
    };

    // Run the checkCookies function once when the component mounts
    checkCookies();

    setInterval(() => {
      checkCookies();
    }, 1000);

    return () => checkCookies();
  }, []);

  // when auth and refresh token is stored to state then fetch Profile data
  useEffect(() => {
    const getProfileData = async () => {
      try {
        return await AxiosInstance.get("profile/me/");
      } catch (e) {
        return e;
      }
    };

    authToken &&
      getProfileData()
        .then((res) => {
          const { data } = res.data;
          // dispatch({ type: "USER DATA", payload: data });

          console.log("auth1", authToken);
          console.log("refresh1", refreshToken);

          console.log("res", res);
          console.log("data", data);
        })
        .catch((err) => {
          // dispatch({
          //   type: "ERROR FETCH USER DATA",
          //   payload: err.response.data,
          // });

          console.log("auth2", authToken);
          console.log("refresh2", refreshToken);

          console.log("err", err);
        });
  }, [dispatch, refreshToken, authToken]);
};

export default useTokens;

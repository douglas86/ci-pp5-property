import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// api and custom hooks
import AxiosInstance from "../API/AxiosInstance";
import useAppContext from "./useAppContext";

const useTokens = () => {
  const [authToken, setAuthToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const { forms, modal } = useAppContext();
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

    if (header === "Registration Form" && success?.data) {
      if (success.data.refresh) {
        storeRefreshToken(success.data.refresh);
      }

      if (success.data.access) {
        storeAuthToken(success.data.access);
      }
    }
  }, [success, header]);

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
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
  }, [refreshToken, authToken]);
};

export default useTokens;

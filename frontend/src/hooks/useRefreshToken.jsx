import Cookies from "js-cookie";
import { useEffect } from "react";
import AxiosInstance from "../API/AxiosInstance";
import useAppContext from "./useAppContext";
import axiosInstance from "../API/AxiosInstance";

const useRefreshToken = () => {
  const { dispatch, forms, modal } = useAppContext();
  const { success } = forms;
  const { header } = modal;

  const refreshToken = Cookies.get("refreshToken");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    const storeRefreshToken = (token) => {
      Cookies.set("refreshToken", token, { expires: 7 });
    };

    const storeAuthToken = (token) => {
      Cookies.set("authToken", token, { expires: 7 });
    };

    // Ensure `success` has valid data before attempting to store tokens
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

    console.log("success", success);
    console.log("header", header);
  }, [forms, modal]);

  const getData = async () => {
    try {
      return axiosInstance.get("profile/me/");
    } catch (error) {
      return error;
    }
  };

  getData()
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export default useRefreshToken;

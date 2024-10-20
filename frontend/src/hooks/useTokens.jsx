// 3rd parties
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// custom hooks
import useAppContext from "./useAppContext";
import useFetch from "./useFetch";

const useTokens = () => {
  // flag for when to fetch profile data
  const [flag, setFlag] = useState(false);

  // check if auth and refresh tokens exist
  const auth = Cookies.get("auth-token");
  const refresh = Cookies.get("refresh-token");

  // fetch profile data based on flag state
  const { data } = useFetch("profile/me/", flag);

  // state store
  const { dispatch, forms, modal } = useAppContext();
  const { success } = forms;
  const { header } = modal;

  // set tokens in cookie store
  useEffect(() => {
    const saveTokens = async (auth, refresh) => {
      Cookies.set("auth-token", auth, { expires: 7 });
      Cookies.set("refresh-token", refresh, { expires: 7 });
    };

    // fetch profile data on Login
    if (header === "Login Form" && success?.data) {
      const { access, refresh } = success.data;
      saveTokens(access, refresh).then(() => setFlag(true));
      // store profile data to state store
      dispatch({ type: "USER DATA", payload: data });
    }

    // fetch profile data on Registration
    if (header === "Registration Form" && success?.data) {
      const { access, refresh } = success.data;
      saveTokens(access, refresh).then(() => setFlag(true));
      // store profile data to state store
      dispatch({ type: "USER DATA", payload: data });
    }

    // Reset all profile data and delete tokens from cookie store on Logout
    if (header === "Logout Form" && success?.data) {
      const { detail } = success.data;

      if (detail && detail === "Successfully logged out.") {
        Cookies.remove("refresh-token");
        Cookies.remove("auth-token");
        setFlag(false);
        dispatch({ type: "USER DATA", payload: null });
      }
    }
  }, [dispatch, data, flag, header, success]);

  // fetch profile data if auth and refresh tokens exist in cookie store
  useEffect(() => {
    // when auth and refresh true set flag to true and store to state store
    if (auth && refresh) {
      setFlag(true);
      dispatch({ type: "USER DATA", payload: data });
    } else {
      setFlag(false);
    }
  }, [dispatch, data, auth, refresh]);

  useEffect(() => {
    const checkCookie = () => {
      const authValue = Cookies.get("auth-token");
      const refreshValue = Cookies.get("refresh-token");

      if (authValue === "undefined" && refreshValue === "undefined") {
        Cookies.remove("auth-token");
        Cookies.remove("refresh-token");
      }
    };

    const interval = setInterval(() => {
      checkCookie();
    }, 1000);

    return () => clearInterval(interval);
  }, [refresh, auth]);
};

export default useTokens;

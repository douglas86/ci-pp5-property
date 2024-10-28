// 3rd parties
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// utils
import { server } from "../utils";
import useAppContext from "./useAppContext";

/**
 * Custom hook used to fetch data from server
 * @param url
 * @param flag
 * @returns {{data, message, error: unknown}}
 */
const useFetch = (url, flag = true) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  // state store
  const { dispatch, refreshData } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        return await axios.get(`${server}/${url}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth-token")}`,
          },
        });
      } catch (error) {
        return error;
      }
    };

    // fetch data on flag true or refreshData true
    if (flag || refreshData) {
      fetchData()
        .then((res) => {
          const { data } = res;
          setData(data === undefined ? {} : data);
          // change refresh flag to false when server responds
          dispatch({ type: "FORM REFRESH FLAG", payload: false });
        })
        .catch((err) => {
          setError(err);
          // change refresh flag to false when server responds
          dispatch({ type: "FORM REFRESH FLAG", payload: false });
        });
    }
  }, [flag, url, refreshData]);

  return {
    data: data.data,
    message: data.message,
    error,
  };
};

export default useFetch;

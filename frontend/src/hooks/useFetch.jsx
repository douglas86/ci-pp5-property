// 3rd parties
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// utils
import { server } from "../utils";
import useAppContext from "./useAppContext";

const useFetch = (url, flag = true) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const { refreshData } = useAppContext();

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

    if (flag || refreshData) {
      fetchData()
        .then((res) => {
          const { data } = res;
          setData(data === undefined ? {} : data);
        })
        .catch((err) => {
          setError(err);
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

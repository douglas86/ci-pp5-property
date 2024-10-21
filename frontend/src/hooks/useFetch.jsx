// 3rd parties
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// utils
import { server } from "../utils";

const useFetch = (url, flag = true) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

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

    if (flag) {
      fetchData()
        .then((res) => {
          const { data } = res;
          setData(data === undefined ? {} : data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [flag, url]);

  return {
    data: data.data,
    message: data.message,
    error,
  };
};

export default useFetch;

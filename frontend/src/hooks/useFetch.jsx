// 3rd parties
import { useEffect, useState } from "react";

// API calling
import AxiosInstance from "../API/AxiosInstance";

/**
 * Custom hook used for fetching external data to Django Rest Framework API
 * @param url
 * @returns {{data: [], message: string, error: string, status: number}}
 */
const useFetch = (url) => {
  const [state, setState] = useState({
    message: "",
    data: [],
    status: 200,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        return await AxiosInstance.get(url);
      } catch (e) {
        return e;
      }
    };

    fetchData()
      .then((res) =>
        setState({
          message: res.data.message,
          data: res.data.data,
          status: res.data.status,
          error: res.data.error,
        }),
      )
      .catch((err) =>
        setState({
          error: err,
        }),
      );
  }, [url]);

  return {
    message: state.message,
    data: state.data,
    status: state.status,
    error: state.error,
  };
};

export default useFetch;

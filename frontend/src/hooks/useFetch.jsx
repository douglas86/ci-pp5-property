import { useEffect, useState } from "react";

import AxiosInstance from "../API/AxiosInstance";

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
  }, []);

  return {
    message: state.message,
    data: state.data,
    status: state.status,
    error: state.error,
  };
};

export default useFetch;

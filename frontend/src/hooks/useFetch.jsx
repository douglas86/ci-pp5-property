// 3rd parties
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useFetch = (url, flag = true) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const env = process.env.NODE_ENV || "development";
  const heroku = "https://ci-pp5-property-v2-api-cc7edcd1041d.herokuapp.com";
  const local = "http://localhost:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        return await axios.get(
          `${env === "development" ? local : heroku}/${url}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth-token")}`,
            },
          },
        );
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
  }, [flag, env, url]);

  return {
    data: data.data,
    message: data.message,
    error,
  };
};

export default useFetch;

// // 3rd parties
// import { useEffect, useState } from "react";
//
// // API calling
// import AxiosInstance from "../API/AxiosInstance";
//
// /**
//  * Custom hook used for fetching external data to Django Rest Framework API
//  * @param url
//  * @returns {{data: [], message: string, error: string, status: number}}
//  */
// const useFetch = (url) => {
//   const [state, setState] = useState({
//     message: "",
//     data: [],
//     status: 200,
//     error: "",
//   });
//
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         return await AxiosInstance.get(url);
//       } catch (e) {
//         return e;
//       }
//     };
//
//     fetchData()
//       .then((res) =>
//         setState({
//           message: res.data.message,
//           data: res.data.data,
//           status: res.data.status,
//           error: res.data.error,
//         }),
//       )
//       .catch((err) =>
//         setState({
//           error: err,
//         }),
//       );
//   }, [url]);
//
//   return {
//     message: state.message,
//     data: state.data,
//     status: state.status,
//     error: state.error,
//   };
// };
//
// export default useFetch;

import axios from "axios";
import Cookies from "js-cookie";

const environment = process.env.NODE_ENV;
const heroku = "https://ci-pp5-property-v2-api-cc7edcd1041d.herokuapp.com";
const local = "http://localhost:8000";
const authToken = Cookies.get("auth-token");
const refreshToken = Cookies.get("refresh-token");
const csrfToken = Cookies.get("csrftoken");

const AxiosInstance = axios.create({
  baseURL: environment === "production" ? heroku : local,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
    "x-refresh-token": refreshToken,
    "X-CSRFToken": csrfToken,
  },
});

export default AxiosInstance;

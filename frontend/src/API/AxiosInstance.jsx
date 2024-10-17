import axios from "axios";
import Cookies from "js-cookie";

const environment = process.env.NODE_ENV; // check if your environment is development or production
const heroku = "https://ci-pp5-property-v2-api-cc7edcd1041d.herokuapp.com";
const local = "http://localhost:8000";
const csrfToken = Cookies.get("csrftoken");
const authToken = Cookies.get("auth-token");

export const AxiosRegister = axios.create({
  baseURL: environment === "production" ? heroku : local,
});

const AxiosInstance = axios.create({
  baseURL: environment === "production" ? heroku : local,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
    "X-CSRFToken": csrfToken,
  },
});

export default AxiosInstance;

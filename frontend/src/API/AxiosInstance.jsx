import axios from "axios";
import Cookie from "js-cookie";

const environment = process.env.NODE_ENV; // check if your environment is development or production
const heroku = "https://ci-pp5-property-v2-api-cc7edcd1041d.herokuapp.com/";
const local = "http://localhost:8000";
const access = Cookie.get("auth-token");

export const AxiosRegister = axios.create({
  baseURL: environment === "development" ? local : heroku,
});

const AxiosInstance = axios.create({
  baseURL: environment === "development" ? local : heroku,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${access}`,
  },
});

export default AxiosInstance;

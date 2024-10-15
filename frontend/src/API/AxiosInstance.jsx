import axios from "axios";

const environment = process.env.NODE_ENV; // check if your environment is development or production
const heroku = "https://ci-pp5-property-v2-api-cc7edcd1041d.herokuapp.com/";
const local = "http://localhost:8000";

export const AxiosRegister = axios.create({
  baseURL: environment === "production" ? heroku : local,
});

const AxiosInstance = axios.create({
  baseURL: environment === "production" ? heroku : local,
  withCredentials: true,
});

export default AxiosInstance;

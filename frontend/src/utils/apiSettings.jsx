const env = process.env.REACT_APP_NODE_ENV || "development";

const heroku = "https://ci-pp5-property-v2-api-cc7edcd1041d.herokuapp.com";
const local = "http://localhost:8000";

export const server = env === "development" ? local : heroku;

// environment variable
const env = process.env.REACT_APP_NODE_ENV || "development";

// heroku api
const heroku = "https://ci-pp5-property-django-bcd4d87abb1f.herokuapp.com";
// local api
const local = "http://localhost:8000";

/**
 * Helper function to communicate with server
 * This will be able to know if you are on local or heroku development
 * based on environment variable
 * @type {string}
 */
export const server = env === "development" ? local : heroku;

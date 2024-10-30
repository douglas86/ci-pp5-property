// atomic design
import Login from "../components/organism/Forms/auth/Login";
import Logout from "../components/organism/Forms/auth/Logout";
import Registration from "../components/organism/Forms/auth/Registration";
import ChangePassword from "../components/organism/Forms/auth/ChangePassword";

import UsersDetails from "../components/organism/Forms/users/UsersDetails";
import UsersUpdate from "../components/organism/Forms/users/UsersUpdate";
import UsersDelete from "../components/organism/Forms/users/UsersDelete";
import PropertyCreate from "../components/organism/Forms/property/PropertyCreate";

/**
 * Helper function to deside on what form to display
 * @param formToUse
 * @returns {JSX.Element}
 */
export const loadForm = (formToUse) => {
  switch (formToUse) {
    case "CHANGE PASSWORD":
      return <ChangePassword />;
    case "REGISTRATION":
      return <Registration />;
    case "LOGOUT":
      return <Logout />;
    case "USERS DETAILS":
      return <UsersDetails />;
    case "USERS UPDATE":
      return <UsersUpdate />;
    case "USERS DELETE":
      return <UsersDelete />;
    case "CREATE PROPERTY":
      return <PropertyCreate />;
    default:
      return <Login />;
  }
};

// atomic design
import Login from "../components/organism/Forms/Login";
import Logout from "../components/organism/Forms/Logout";
import Registration from "../components/organism/Forms/Registration";
import ChangePassword from "../components/organism/Forms/ChangePassword";

import UsersDetails from "../components/organism/Forms/UsersDetails";
import UsersUpdate from "../components/organism/Forms/UsersUpdate";

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
    default:
      return <Login />;
  }
};

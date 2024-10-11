import Login from "../components/organism/Forms/Login";
import Logout from "../components/organism/Forms/Logout";
import Registration from "../components/organism/Forms/Registration";
import ChangePassword from "../components/organism/Forms/ChangePassword";

export const whichAuthForm = (formToUse) => {
  switch (formToUse) {
    case "CHANGE PASSWORD":
      return <ChangePassword />;
    case "REGISTRATION":
      return <Registration />;
    case "LOGOUT":
      return <Logout />;
    default:
      return <Login />;
  }
};
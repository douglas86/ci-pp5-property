import useAppContext from "../../../hooks/useAppContext";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { dispatch, user, isAdmin } = useAppContext();

  useEffect(() => {
    // check if user is not admin
    // if user is not an admin display login form
    if (isAdmin === null) {
      dispatch({ type: "WHICH FORM TO USE", payload: "" });
      dispatch({ type: "CHANGE MODAL STATE", payload: true });
      // if a user is an admin close modal
    } else {
      dispatch({ type: "CHANGE MODAL STATE", payload: false });
    }
  }, [isAdmin]);

  console.log("user", user);
  console.log("isAdmin", isAdmin);

  return (
    <>
      {user ? (
        <h1>Admin Dashboard</h1>
      ) : (
        <h1>This is a protected page please login</h1>
      )}
    </>
  );
};

export default AdminDashboard;

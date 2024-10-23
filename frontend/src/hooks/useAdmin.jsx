// 3rd party
import { useEffect } from "react";

// custom hooks
import useAppContext from "./useAppContext";

const useAdmin = () => {
  // state store
  const { dispatch, isAdmin } = useAppContext();

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
  }, [dispatch, isAdmin]);
};

export default useAdmin;

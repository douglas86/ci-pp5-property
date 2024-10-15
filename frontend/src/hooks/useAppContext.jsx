import { useContext } from "react";
import { Context } from "../context/store";

const useAppContext = () => {
  const context = useContext(Context);
  const { state, dispatch } = context;

  return {
    state,
    dispatch,
    forms: state.formsReducers,
    user: state.userReducers.user,
    userError: state.userReducers.err,
    modal: state.modalReducers,
  };
};

export default useAppContext;

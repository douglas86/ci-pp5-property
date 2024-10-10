import { useContext } from "react";
import { Context } from "../context/store";

const useAppContext = () => {
  const context = useContext(Context);
  const { state, dispatch } = context;

  return {
    state,
    dispatch,
    user: state.userReducers,
    modal: state.modalReducers,
  };
};

export default useAppContext;

// 3rd parties
import { useContext } from "react";

// state store
import { Context } from "../context/store";

/**
 * This custom hook is used for fetching and posting data to the state store
 * @returns {{userError: null, dispatch, alert: ({msg: string}|(function(*, *): *)|*), state, isAdmin: (boolean|null), isUser: (boolean|null), user: null, forms: ({loadForm: string, data: {}, err: {}, success: {}, loading: boolean, url: string}|(function(*, *): *)|*), modal: ({header: string, showModal: boolean}|(function(*, *): *)|*)}}
 */
const useAppContext = () => {
  // state store
  const context = useContext(Context);
  const { state, dispatch } = context;

  return {
    state,
    dispatch,
    alert: state.alertReducers,
    forms: state.formsReducers,
    user: state.userReducers.user,
    userError: state.userReducers.err,
    isAdmin: state.userReducers.user
      ? state.userReducers.user.role === "admin"
      : null,
    isUser: state.userReducers.user
      ? state.userReducers.user.role === "user"
      : null,
    modal: state.modalReducers,
  };
};

export default useAppContext;

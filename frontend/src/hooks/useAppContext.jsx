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
    state, // show all data in the state store
    dispatch, // used for posting data to state store across the app
    alert: state.alertReducers, // show only what is in the alert object
    forms: state.formsReducers, // show only what is in the forms object
    user: state.userReducers.user, // show only what is in the user object
    userError: state.userReducers.err, // show errors for the user object
    isAdmin: state.userReducers.user // check if a user is logged in with a role of admin
      ? state.userReducers.user.role === "admin"
      : null,
    isUser: state.userReducers.user // check if a user is logged in with a role of user
      ? state.userReducers.user.role === "user"
      : null,
    refreshData: state.formsReducers.refreshData, // refresh data on a refresh flag
    modal: state.modalReducers, // show only what is in the modal object
  };
};

export default useAppContext;

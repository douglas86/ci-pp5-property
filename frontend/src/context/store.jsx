// 3rd parties
import { createContext, useMemo, useReducer } from "react";

// root reducer function
import { rootReducers } from "./rootReducers";

// initial states for state store
const initialState = {
  alertReducers: {
    msg: "",
  },
  formsReducers: {
    data: {},
    err: {},
    success: {},
    url: "",
    whichForm: "",
    loading: false,
  },
  userReducers: {
    user: null,
    err: null,
  },
  modalReducers: {
    header: "Login",
    showModal: false,
  },
};

// calling the initial state into context store
export const Context = createContext(initialState);

// initializes the initialState
const init = (initialState) => {
  // destructuring functions from initialState
  const { alertReducers } = initialState;
  const { formsReducers, userReducers, modalReducers } = initialState;

  return { alertReducers, formsReducers, userReducers, modalReducers };
};

// Provider function used to wrap around App for state store
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducers, initialState, init);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

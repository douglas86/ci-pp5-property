import { createContext, useMemo, useReducer } from "react";
import { rootReducers } from "./rootReducers";

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

export const Context = createContext(initialState);

const init = (initialState) => {
  const { alertReducers } = initialState;
  const { formsReducers, userReducers, modalReducers } = initialState;

  return { alertReducers, formsReducers, userReducers, modalReducers };
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducers, initialState, init);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

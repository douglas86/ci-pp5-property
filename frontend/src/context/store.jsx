import { createContext, useMemo, useReducer } from "react";
import { rootReducers } from "./rootReducers";

const initialState = {
  formsReducers: {
    data: {},
    err: {},
    success: {},
    url: "",
    whichForm: "",
    loading: false,
  },
  userReducers: null,
  modalReducers: {
    header: "Login",
    showModal: false,
  },
};

export const Context = createContext(initialState);

const init = (initialState) => {
  const { formsReducers, userReducers, modalReducers } = initialState;

  return { formsReducers, userReducers, modalReducers };
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducers, initialState, init);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

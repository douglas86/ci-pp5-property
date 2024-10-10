import { createContext, useMemo, useReducer } from "react";
import { rootReducers } from "./rootReducers";

const initialState = {
  userReducers: null,
  modalReducers: {
    header: "Login",
    btn: "Login",
  },
};

export const Context = createContext(initialState);

const init = (initialState) => {
  const { userReducers, modalReducers } = initialState;

  return { userReducers, modalReducers };
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducers, initialState, init);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
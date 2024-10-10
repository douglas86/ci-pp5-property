import { combineReducers } from "./cobineReducers";
import { modalReducers, userReducers } from "./reducers";

export const rootReducers = combineReducers({
  modalReducers,
  userReducers,
});

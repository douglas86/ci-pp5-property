import { combineReducers } from "./cobineReducers";
import { formsReducers, modalReducers, userReducers } from "./reducers";

export const rootReducers = combineReducers({
  formsReducers,
  modalReducers,
  userReducers,
});

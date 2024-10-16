import { combineReducers } from "./cobineReducers";

// reducer functions
import { alertReducers } from "./reducers";
import { formsReducers, modalReducers, userReducers } from "./reducers";

export const rootReducers = combineReducers({
  alertReducers,
  formsReducers,
  modalReducers,
  userReducers,
});

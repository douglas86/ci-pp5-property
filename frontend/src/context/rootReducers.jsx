// combining of reducer functions
import { combineReducers } from "./cobineReducers";

// reducer functions
import { alertReducers } from "./reducers";
import { formsReducers, modalReducers, userReducers } from "./reducers";

/**
 * Function that is used to pass all reducer functions for combining into one
 * @type {function(*, *): string}
 */
export const rootReducers = combineReducers({
  alertReducers,
  formsReducers,
  modalReducers,
  userReducers,
});

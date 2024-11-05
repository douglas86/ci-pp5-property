/**
 * Alert Reducer function responsible for handling the alert messages
 * @param state
 * @param action
 * @returns {(*&{msg, status: number})|*|(*&{msg: string})}
 */
export const alertReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // show a successful alert message
    //       using the variant of primary from react-bootstrap
    case "SUCCESSFUL MESSAGE":
      return { ...state, status: 200, msg: payload };
    // show an unsuccessful alert message
    //       using the variant of danger from react-bootstrap
    case "ERROR MESSAGE":
      return { ...state, status: 400, msg: payload };
    // reset alert message based on timer from AlertBox Component
    case "RESET MESSAGE":
      return { ...state, msg: "" };
    default:
      return state;
  }
};

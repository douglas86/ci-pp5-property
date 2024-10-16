export const alertReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SUCCESSFUL MESSAGE":
      return { ...state, status: 200, msg: payload };
    case "ERROR MESSAGE":
      return { ...state, status: 400, msg: payload };
    case "RESET MESSAGE":
      return { ...state, msg: "" };
    default:
      return state;
  }
};

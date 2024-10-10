export const modalReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE HEADER":
      return { ...state, header: payload };
    case "CHANGE BTN":
      return { ...state, btn: payload };
    default:
      return state;
  }
};

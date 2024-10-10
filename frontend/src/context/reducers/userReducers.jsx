export const userReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER DATA":
      return { ...state, user: payload };
    default:
      return state;
  }
};

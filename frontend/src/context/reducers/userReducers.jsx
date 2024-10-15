export const userReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER DATA":
      return { ...state, user: payload };
    case "ERROR FETCH USER DATA":
      return { ...state, err: payload };
    default:
      return state;
  }
};

export const userReducers = (state, action) => {
  const { type, payload } = action;

  console.log("payload", payload);

  switch (type) {
    case "USER":
      return { ...state, user: payload };
    default:
      return state;
  }
};

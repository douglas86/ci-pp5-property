/**
 * User Reducer function used to handle all data for the logged-in user
 * @param state
 * @param action
 * @returns {*|(*&{err})|(*&{user})}
 */
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

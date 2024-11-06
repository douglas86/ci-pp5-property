/**
 * User Reducer function used to handle all data for the logged-in user
 * @param state
 * @param action
 * @returns {*|(*&{err})|(*&{user})}
 */
export const userReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // saves user data to state store
    case "USER DATA":
      return { ...state, user: payload };
    // when struggling to fetch users' data
    case "ERROR FETCH USER DATA":
      return { ...state, err: payload };
    default:
      return state;
  }
};

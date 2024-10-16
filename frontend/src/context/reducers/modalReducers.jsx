/**
 * Modal Reducer function used for handling all modal data
 * @param state
 * @param action
 * @returns {(*&{showModal})|*|(*&{header})}
 */
export const modalReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE HEADER":
      return { ...state, header: payload };
    case "CHANGE MODAL STATE":
      return { ...state, showModal: payload };
    default:
      return state;
  }
};

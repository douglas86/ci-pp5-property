/**
 * Modal Reducer function used for handling all modal data
 * @param state
 * @param action
 * @returns {(*&{showModal})|*|(*&{header})}
 */
export const modalReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // change the header of the modal
    case "CHANGE HEADER":
      return { ...state, header: payload };
    // show hide model base on payload true or false
    case "CHANGE MODAL STATE":
      return { ...state, showModal: payload };
    default:
      return state;
  }
};

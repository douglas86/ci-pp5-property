export const formsReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FORM INPUT DATA":
      const { name, value } = payload;
      return { ...state, data: { ...state.data, [name]: value } };
    case "FORM ERRORS":
      return { ...state, errors: payload };
    case "FORM SUCCESS":
      return { ...state, success: payload };
    case "FORM SUBMIT URL":
      return { ...state, url: payload };
    case "WHICH FORM TO USE":
      return { ...state, whichForm: payload };
    default:
      return state;
  }
};

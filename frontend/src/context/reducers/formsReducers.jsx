/**
 * Forms Reducer function responsible for handling all form data
 * @param state
 * @param action
 * @returns {(*&{whichForm: string, data: {}, err: {}, success: {}, loading: boolean, url: string})|(*&{data})|(*&{whichForm})|(*&{err})|(*&{success})|*|(*&{loading})|(*&{url})}
 */
export const formsReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FORM INPUT DATA":
      const { name, value } = payload;
      return { ...state, data: { ...state.data, [name]: value } };
    case "FORM ERRORS":
      return { ...state, err: payload };
    case "FORM SUCCESS":
      return { ...state, success: payload };
    case "FORM SUBMIT URL":
      return { ...state, url: payload };
    case "WHICH FORM TO USE":
      return { ...state, whichForm: payload };
    case "FORM LOADING":
      return { ...state, loading: payload };
    case "RESET FORM":
      return {
        ...state,
        data: {},
        err: {},
        success: {},
        url: "",
        whichForm: "",
        loading: false,
      };
    default:
      return state;
  }
};

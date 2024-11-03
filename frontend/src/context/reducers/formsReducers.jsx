/**
 * Forms Reducer function responsible for handling all form data
 * @param state
 * @param action
 * @returns {(*&{loadForm: string, data: {}, err: {}, success: {}, loading: boolean, url: string})|(*&{data})|(*&{loadForm})|(*&{err})|(*&{success})|*|(*&{loading})|(*&{url})}
 */
export const formsReducers = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // data from input tags on form
    case "FORM INPUT DATA":
      const { name, value } = payload;
      return { ...state, data: { ...state.data, [name]: value } };
    // if an error occurs from server
    case "FORM ERRORS":
      return { ...state, err: payload };
    // if the data was successful from server
    case "FORM SUCCESS":
      return { ...state, success: payload };
    // url for where form data needs to be sent
    case "FORM SUBMIT URL":
      return { ...state, url: payload };
    // load the form that you want displayed in modal
    case "WHICH FORM TO USE":
      // the name of the payload is taken from loadForm in util directory
      return { ...state, whichForm: payload };
    // when data is being sent to server spinner appears
    //       spinner disappears on server response
    case "FORM LOADING":
      return { ...state, loading: payload };
    // used for viewing details about a person, property, etc.
    case "FORM DETAILS":
      return { ...state, view: payload };
    // resets the view object in the forms state store
    case "RESET FORM VIEW":
      return { ...state, view: payload };
    // refresh data by use of a flag
    case "FORM REFRESH FLAG":
      return { ...state, refreshData: payload };
    // reset the form state of all its data
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

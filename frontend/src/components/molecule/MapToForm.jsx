// 3rd parties
import Form from "react-bootstrap/Form";

// custom hook
import useAppContext from "../../hooks/useAppContext";

/**
 * This molecule is responsible for display error message and Form control elements
 * @param name - input attribute a requirement for when posting data to server
 * @param type - input attribute used to define the type of the input being used
 * @param placeholder - input attribute used to define what text you want to see in the input before typing
 * @param formValidation - this is used for React hook forms validation checking
 * @param errors - used for react hook forms to see what errors need to be displayed
 * @param register - used to register the input with React Hook Forms
 * @returns {JSX.Element}
 * @constructor
 */
const MapToForm = ({
  name,
  type,
  placeholder,
  formValidation,
  errors,
  register,
}) => {
  // state store
  const { forms } = useAppContext();
  const { err } = forms;

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label column={true}>{name}</Form.Label>
      <Form.Control
        type={type}
        {...register(name, formValidation)}
        placeholder={placeholder}
        autoFocus={true}
        name={name}
      />
      {/*show an error message*/}
      {/*from React hook form*/}
      {errors[name] && <p className="text-danger">{errors[name].message}</p>}
      {/*from server*/}
      {err[name] && <p className="text-danger">{err[name]}</p>}
    </Form.Group>
  );
};

export default MapToForm;

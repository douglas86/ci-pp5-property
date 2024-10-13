import Form from "react-bootstrap/Form";
import useAppContext from "../../hooks/useAppContext";

const MapToForm = ({
  name,
  type,
  placeholder,
  formValidation,
  errors,
  register,
}) => {
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

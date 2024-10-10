import Form from "react-bootstrap/Form";
import useAppContext from "../../hooks/useAppContext";

import styles from "../../styles/components/organism/Forms.module.css";

const MapToForm = ({ name, type, placeholder }) => {
  const { forms, dispatch } = useAppContext();
  const { errors } = forms;

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label column={true}>{name}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        autoFocus={true}
        name={name}
        onChange={(e) =>
          dispatch({ type: "FORM INPUT DATA", payload: e.target })
        }
      />
      <p className={styles.errors}>{errors[name]}</p>
    </Form.Group>
  );
};

export default MapToForm;

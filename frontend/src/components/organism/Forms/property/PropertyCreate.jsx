import { useEffect } from "react";
import useAppContext from "../../../../hooks/useAppContext";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const PropertyCreate = () => {
  const { dispatch } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // change modal header
    dispatch({ type: "CHANGE HEADER", payload: "Create a new Property" });
  }, [dispatch]);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail"></Form.Group>
    </Form>
  );
};

export default PropertyCreate;

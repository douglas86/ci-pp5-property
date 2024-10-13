// 3rd pary
import Modal from "react-bootstrap/Modal";

// utils and custom hooks
import { whichAuthForm } from "../../utils/whichAuthForm";
import useAppContext from "../../hooks/useAppContext";

const FormModal = () => {
  const { dispatch, forms, modal } = useAppContext();
  const { header, showModal } = modal;
  const { err, whichForm } = forms;

  const handleClose = () =>
    dispatch({ type: "CHANGE MODAL STATE", payload: false });

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {whichAuthForm(whichForm)}
        {err["non_field_errors"] && (
          <p className="text-danger">{err["non_field_errors"]}</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;

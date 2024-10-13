import Modal from "react-bootstrap/Modal";
import useAppContext from "../../hooks/useAppContext";
import { whichAuthForm } from "../../utils/whichAuthForm";

const Authentication = () => {
  const { dispatch, forms, modal } = useAppContext();
  const { header, showModal } = modal;
  const { err, whichForm } = forms;

  const handleClose = () => dispatch({ type: "CHANGE MODAL STATE", payload: false });

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

export default Authentication;

// 3rd pary
import Modal from "react-bootstrap/Modal";

// utils and custom hooks
import useAppContext from "../../hooks/useAppContext";
import { whichAuthForm } from "../../utils/whichAuthForm";

/**
 * Modal that is being used to handle forms
 * This Modal shows and hides based from variables in the state store
 * @returns {JSX.Element}
 * @constructor
 */
const FormModal = () => {
  // state store
  const { dispatch, forms, modal } = useAppContext();
  const { header, showModal } = modal;
  const { err, whichForm } = forms;

  // handles closing of the modal when the X is clicked
  const handleClose = () =>
    dispatch({ type: "CHANGE MODAL STATE", payload: false });

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/*chooses which form needs to be displayed from the state store*/}
        {whichAuthForm(whichForm)}

        {/*displaying of non-field error messages*/}
        {err["non_field_errors"] && (
          <p className="text-danger">{err["non_field_errors"]}</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;

import Modal from "react-bootstrap/Modal";
import useAppContext from "../../hooks/useAppContext";
import { whichAuthForm } from "../../utils/whichAuthForm";

import styles from "../../styles/components/organism/Forms.module.css";

const Authentication = ({ show, setShow }) => {
  const { forms, modal } = useAppContext();
  const { header } = modal;
  const { err, whichForm } = forms;

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {whichAuthForm(whichForm)}
        {err["non_field_errors"] && (
          <p className={styles.errors}>{err["non_field_errors"]}</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Authentication;

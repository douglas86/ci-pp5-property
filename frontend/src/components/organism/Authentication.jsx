import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Registration from "./Forms/Registration";
import { useState } from "react";
import { button } from "../atom/button";

const Authentication = ({ state, setState }) => {
  const [header, setHeader] = useState("Login Form");

  const handleClose = () => setState(false);

  return (
    <Modal show={state} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Registration setState={setHeader} />
      </Modal.Body>
      <Modal.Footer>
        {button(handleClose, "Close", "secondary")}
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Authentication;

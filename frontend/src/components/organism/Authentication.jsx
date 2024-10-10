import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { button } from "../atom/button";
import Logout from "./Forms/Logout";

const Authentication = ({ state, setState }) => {
  const [header, setHeader] = useState("Login Form");
  const [btn, setBtn] = useState("Login");

  const handleClose = () => setState(false);

  return (
    <Modal show={state} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Logout setState={setHeader} setBtn={setBtn} />
      </Modal.Body>
      <Modal.Footer>
        {button(handleClose, "Close", "secondary")}
        {button(handleClose, btn, "warning")}
      </Modal.Footer>
    </Modal>
  );
};

export default Authentication;

import Modal from "react-bootstrap/Modal";
import { button } from "../atom/button";
import useAppContext from "../../hooks/useAppContext";
import Login from "./Forms/Login";

const Authentication = ({ show, setShow }) => {
  const { modal } = useAppContext();
  const { header, btn } = modal;

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login />
      </Modal.Body>
      <Modal.Footer>
        {button(handleClose, "Close", "secondary")}
        {button(handleClose, btn, "warning")}
      </Modal.Footer>
    </Modal>
  );
};

export default Authentication;

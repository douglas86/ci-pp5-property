import Modal from "react-bootstrap/Modal";
import { button } from "../atom/button";
import useAppContext from "../../hooks/useAppContext";
import Registration from "./Forms/Registration";
import { AxiosRegister } from "../../API/AxiosInstance";
import { useState } from "react";

const Authentication = ({ show, setShow }) => {
  const [form, setForm] = useState({});

  const { modal } = useAppContext();
  const { header, btn } = modal;

  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    await AxiosRegister.post("/dj-rest-auth/registration/", form)
      .then((res) => console.log("res", res))
      .catch((err) => console.log("err", err));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Registration form={form} setForm={setForm} />
      </Modal.Body>
      <Modal.Footer>
        {button(handleClose, "Close", "secondary")}
        {button(handleSubmit, btn, "warning")}
      </Modal.Footer>
    </Modal>
  );
};

export default Authentication;

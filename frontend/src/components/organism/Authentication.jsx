import Modal from "react-bootstrap/Modal";
import { button } from "../atom/button";
import useAppContext from "../../hooks/useAppContext";
import { AxiosRegister } from "../../API/AxiosInstance";
import { whichAuthForm } from "../../utils/whichAuthForm";

import styles from "../../styles/components/organism/Forms.module.css";
import { useState } from "react";

const Authentication = ({ show, setShow }) => {
  const [loading, setLoading] = useState("");

  const { forms, modal, dispatch } = useAppContext();
  const { header, btn } = modal;
  const { data, errors, url, whichForm } = forms;

  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    setLoading("Please wait will your data is being processed?");

    await AxiosRegister.post(url, data)
      .then((res) => {
        // save data to success forms state in state store
        dispatch({ type: "FORM SUCCESS", payload: res });
        // save users data to the users state in state store
        dispatch({ type: "USER DATA", payload: res.data.user });
        // when data has been processed close form and reset loading state
        handleClose();
        setLoading("");
      })
      .catch((err) => {
        // when errors occur, it gets save to forms errors state in state store
        dispatch({ type: "FORM ERRORS", payload: err.response.data });
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <h3 className={styles.loading}>{loading}</h3>
      <Modal.Body>
        {whichAuthForm(whichForm)}
        <p className={styles.errors}>{errors["non_field_errors"]}</p>
      </Modal.Body>
      <Modal.Footer>
        {button(handleClose, "Close", "secondary")}
        {button(handleSubmit, btn, "warning")}
      </Modal.Footer>
    </Modal>
  );
};

export default Authentication;

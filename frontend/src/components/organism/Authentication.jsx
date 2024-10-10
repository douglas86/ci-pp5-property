import Modal from "react-bootstrap/Modal";
import { button } from "../atom/button";
import useAppContext from "../../hooks/useAppContext";
import { AxiosRegister } from "../../API/AxiosInstance";
import { whichAuthForm } from "../../utils/whichAuthForm";

const Authentication = ({ show, setShow }) => {
  const { forms, modal, dispatch } = useAppContext();
  const { header, btn } = modal;
  const { data, url, whichForm } = forms;

  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    await AxiosRegister.post(url, data)
      .then((res) => {
        // save data to success forms state in state store
        dispatch({ type: "FORM SUCCESS", payload: res });
        // save users data to the users state in state store
        dispatch({ type: "USER DATA", payload: res.data.user });
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
      <Modal.Body>{whichAuthForm(whichForm)}</Modal.Body>
      <Modal.Footer>
        {button(handleClose, "Close", "secondary")}
        {button(handleSubmit, btn, "warning")}
      </Modal.Footer>
    </Modal>
  );
};

export default Authentication;

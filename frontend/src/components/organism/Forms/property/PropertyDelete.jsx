// 3rd party
import { useEffect } from "react";
import Form from "react-bootstrap/Form";

// atomic design
import { button, spinner } from "../../../atom";

// custom hooks and utils
import useAppContext from "../../../../hooks/useAppContext";
import { onDelete } from "../../../../utils";

// styling
import styles from "../../../../styles/components/organism/Forms.module.css";

/**
 * Form for deleting a property from a database
 * @returns {JSX.Element}
 * @constructor
 */
const PropertyDelete = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { loading, view } = forms;
  const { id, address } = view;

  useEffect(() => {
    // change the header of the modal
    dispatch({
      type: "CHANGE HEADER",
      payload: `Delete Property: ${address} from existance`,
    });
  }, [dispatch, id, address]);

  return (
    <Form onSubmit={(e) => onDelete(e, `properties/delete/${id}/`, dispatch)}>
      {/*show/hide spinner on server request*/}
      {loading ? spinner() : null}

      {/*logic to check if user is admin*/}
      <Form.Label column={true}>
        "Are you sure you want to delete this property?"
      </Form.Label>

      {/*Cancel and Delete buttons*/}
      <div className={styles.btn}>
        {button(
          () => dispatch({ type: "CHANGE MODAL STATE", payload: false }),
          "Cancel",
          "secondary",
        )}

        {button("submit", "Delete Property", "danger")}
      </div>
    </Form>
  );
};

export default PropertyDelete;

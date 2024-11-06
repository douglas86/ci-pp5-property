// 3rd party
import { Card, Image } from "react-bootstrap";

// atomic design
import DisplayTimeAgo from "../../../molecule/DisplayTimeAgo";
import formatDate from "../../../molecule/FormatDate";
import { button } from "../../../atom";

// custom hooks
import useAppContext from "../../../../hooks/useAppContext";

/**
 * Shows the details of the property
 * @returns {JSX.Element}
 * @constructor
 */
const PropertyDetails = () => {
  // state store
  const { dispatch, forms, isAdmin } = useAppContext();
  const { view } = forms;

  // destructure view from state store
  const { address, area_code, description, price, image } = view;
  const { created_at, updated_at } = view;

  // Calculated time ago
  const { created, updated } = DisplayTimeAgo(created_at, updated_at);

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Image src={image} width="100%" height="200" objectfit="cover" />
        </Card.Title>
        <Card.Subtitle>
          Postcode: {area_code === "None" ? "Unknown" : area_code}
        </Card.Subtitle>
        <div>
          <Card.Text>Price: £ {price} per month</Card.Text>
          <Card.Text>Description: {description}</Card.Text>
          <Card.Text>
            Address: {address === "None" ? "Unknown" : address}
          </Card.Text>
          <Card.Text>
            Created: {created} on {formatDate(created_at)}
          </Card.Text>
          <Card.Text>
            Last Updated: {updated} on {formatDate(updated_at)}
          </Card.Text>
        </div>
      </Card.Body>

      {/*only show update delete button if you are the admin*/}
      {isAdmin && (
        <>
          {/*update and delete buttons*/}
          {button(
            () => {
              // once clicked show modal
              dispatch({ type: "CHANGE MODAL STATE", payload: true });
              // load DELETE FORM
              dispatch({
                type: "WHICH FORM TO USE",
                payload: "UPDATE PROPERTY",
              });
            },
            "Update Property",
            "outline-success",
          )}
          {button(
            () => {
              // once clicked show modal
              dispatch({ type: "CHANGE MODAL STATE", payload: true });
              // load DELETE FORM
              dispatch({
                type: "WHICH FORM TO USE",
                payload: "DELETE PROPERTY",
              });
            },
            "Delete Property",
            "outline-danger",
          )}
        </>
      )}
    </Card>
  );
};

export default PropertyDetails;

import { Card, Image } from "react-bootstrap";
import { button } from "../atom";
import useAppContext from "../../hooks/useAppContext";

const DisplayPropertyCard = ({ items }) => {
  const { dispatch } = useAppContext();

  return (
    <>
      <Card key={items.id} style={{ width: "18rem" }}>
        <Image src={items.image} width="100%" height="200" objectfit="cover" />
        <Card.Body>
          <Card.Title>Post code: {items.area_code}</Card.Title>
          <hr />
          <Card.Text>{items.description}</Card.Text>
          <hr />
          <Card.Text>{items.address}</Card.Text>
          <hr />
          <Card.Text>Price: £{items.price} per month</Card.Text>
          <hr />
          {/*view button to display property data in modal*/}
          <div className="d-flex flex-md-wrap justify-content-around gap-2 mt-3">
            {button(
              () => {
                // change modal header
                dispatch({
                  type: "CHANGE HEADER",
                  payload: `Property Address: ${items.address}`,
                });
                // once clicked show modal
                dispatch({
                  type: "CHANGE MODAL STATE",
                  payload: true,
                });
                // load USERS DETAILS form
                dispatch({
                  type: "WHICH FORM TO USE",
                  payload: "READ PROPERTY",
                });
                // pushed data to view an object in form state
                dispatch({ type: "FORM DETAILS", payload: items });
              },
              "View",
              "outline-info",
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default DisplayPropertyCard;

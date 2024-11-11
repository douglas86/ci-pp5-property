// 3rd party
import { Card, Image } from "react-bootstrap";

// atomic design
import { button } from "../atom";

// custom hooks
import useAppContext from "../../hooks/useAppContext";

/**
 * Display Property cards when data is passed
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
const DisplayPropertyCard = ({ data }) => {
  // state store
  const { dispatch } = useAppContext();

  return (
    <>
      <Card key={data.id} style={{ width: "18rem" }}>
        <Image src={data.image} width="100%" height="200" objectfit="cover" />
        <Card.Body>
          <Card.Title>Post code: {data.area_code}</Card.Title>
          <hr />
          <Card.Text>{data.description}</Card.Text>
          <hr />
          <Card.Text>{data.address}</Card.Text>
          <hr />
          <Card.Text>Price: £{data.price} per month</Card.Text>
          <hr />
          {/*view button to display property data in modal*/}
          <div className="d-flex flex-md-wrap justify-content-around gap-2 mt-3">
            {button(
              () => {
                // change modal header
                dispatch({
                  type: "CHANGE HEADER",
                  payload: `Property Address: ${data.address}`,
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
                dispatch({ type: "FORM DETAILS", payload: data });
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

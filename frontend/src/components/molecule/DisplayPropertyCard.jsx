import { Card, Image } from "react-bootstrap";
import { button } from "../atom";
import useAppContext from "../../hooks/useAppContext";

const DisplayPropertyCard = ({ data }) => {
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

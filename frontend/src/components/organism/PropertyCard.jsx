import { Card, Image } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { button, spinner } from "../atom";

import styles from "../../styles/components/organism/Card.module.css";
import useAppContext from "../../hooks/useAppContext";

const PropertyCard = () => {
  // state store
  const { dispatch } = useAppContext();

  // fetch data
  const { data } = useFetch("properties/read/");

  console.log("data", data);

  return (
    <div className={styles.card}>
      {data
        ? data.map((items) => (
            <Card key={items.id} style={{ width: "18rem" }}>
              <Image
                src={items.image}
                width="100%"
                height="200"
                objectfit="cover"
              />
              <Card.Body>
                <Card.Title>Post code: {items.area_code}</Card.Title>
                <Card.Text>{items.description}</Card.Text>
                <Card.Text>{items.address}</Card.Text>
                <Card.Text>Price: £{items.price}</Card.Text>
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
          ))
        : spinner()}
    </div>
  );
};

export default PropertyCard;

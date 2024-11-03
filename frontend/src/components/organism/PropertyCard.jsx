import { Button, Card, Image } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { spinner } from "../atom";

import styles from "../../styles/components/organism/Card.module.css";

const PropertyCard = () => {
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
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))
        : spinner()}
    </div>
  );
};

export default PropertyCard;

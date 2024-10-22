import { Card, Image } from "react-bootstrap";

const MapToCards = ({ quote, name, description, image }) => {
  return (
    <Card className="mb-4 custom-border shadow-lg">
      <Card.Body>
        <blockquote className="blockquote mb-4">
          <p>"{quote}"</p>
        </blockquote>
        <div className="d-flex align-items-center">
          <Image
            src={image}
            roundedCircle
            width="50"
            height="50"
            className="me-3"
          />
          <div>
            <Card.Title className="mb-0">{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MapToCards;

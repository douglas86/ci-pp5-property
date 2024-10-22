import React from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import Avatar from "../../assets/images/avatars/Avatar.png";
import Avatar2 from "../../assets/images/avatars/Avatar2.png";
import Avatar3 from "../../assets/images/avatars/Avatar3.png";

const Cards = () => {
  const cardInformation = [
    {
      id: 1,
      quote: "A terrific piece of praise",
      name: "Douglas Maxton",
      description: "Web developer and content creator",
      image: Avatar,
    },
    {
      id: 2,
      quote: "A fantastic bit of feedback",
      name: "Luke Buchanan",
      description: "Mentor and UI/UX Developer",
      image: Avatar2,
    },
    {
      id: 3,
      quote: "A genuinely glowing review",
      name: "Amelia Collins",
      description: "Marketing and business analytics",
      image: Avatar3,
    },
  ];

  return (
    <Container>
      <Row>
        {cardInformation.map((testimonial, index) => (
          <Col key={index} md={4}>
            <Card className="mb-4 custom-border shadow-lg">
              <Card.Body>
                <blockquote className="blockquote mb-4">
                  <p>"{testimonial.quote}"</p>
                </blockquote>
                <div className="d-flex align-items-center">
                  <Image
                    src={testimonial.image}
                    roundedCircle
                    width="50"
                    height="50"
                    className="me-3"
                  />
                  <div>
                    <Card.Title className="mb-0">{testimonial.name}</Card.Title>
                    <Card.Text>{testimonial.description}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;

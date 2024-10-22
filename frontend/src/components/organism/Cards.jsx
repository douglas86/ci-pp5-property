// 3rd party
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// atomic design
import MapToCards from "../molecule/MapToCards";

// assets
import Avatar from "../../assets/images/avatars/Avatar.png";
import Avatar2 from "../../assets/images/avatars/Avatar2.png";
import Avatar3 from "../../assets/images/avatars/Avatar3.png";

/**
 * Display cards with shadow box
 * @returns {Element}
 * @constructor
 */
const Cards = () => {
  // array to be mapped to cards
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
        {cardInformation.map(({ id, quote, name, description, image }) => (
          <Col key={id} md={4}>
            <MapToCards
              quote={quote}
              name={name}
              description={description}
              image={image}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;

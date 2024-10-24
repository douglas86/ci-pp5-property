import { Card, Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { button } from "../atom";

const UsersCard = ({ data }) => {
  console.log("data", data);

  const titleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  return (
    <Container>
      <Row>
        {data
          ? data.map(({ id, user, profile_picture, role }) => (
              <Col key={id} md={4}>
                <Card className="mb-4 custom-border shadow-lg">
                  <Card.Body>
                    <Card.Title className="mb-0">
                      Username: {titleCase(user)}
                    </Card.Title>
                    <div className="d-flex align-items-center">
                      <Image
                        src={profile_picture}
                        roundedCircle
                        width={50}
                        height={50}
                        className="me-3"
                      />
                      <div>
                        <blockquote className="blockquote mb-0">
                          <p>Permission: {titleCase(role)}</p>
                        </blockquote>
                      </div>
                    </div>
                    <div className="d-flex flex-md-wrap justify-content-around gap-2 mt-3">
                      {button(
                        () => console.log * "View clicked",
                        "View",
                        "outline-info",
                      )}
                      {button(
                        () => console.log("Update Clicked"),
                        "Update",
                        "outline-success",
                      )}
                      {button(
                        () => console.log("Delete Clicked"),
                        "Delete",
                        "outline-danger",
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : null}
      </Row>
    </Container>
  );
};

export default UsersCard;

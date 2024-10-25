import { Card, Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { button } from "../atom";
import { titleCase } from "../../utils";
import useAppContext from "../../hooks/useAppContext";

const UsersCard = ({ data }) => {
  const { dispatch } = useAppContext();

  return (
    <Container>
      <Row>
        {data
          ? data.map((items) => (
              <Col key={items.id} md={4}>
                <Card className="mb-4 custom-border shadow-lg">
                  <Card.Body>
                    <Card.Title className="mb-0">
                      Username: {titleCase(items.user)}
                    </Card.Title>
                    <div className="d-flex align-items-center">
                      <Image
                        src={items.profile_picture}
                        roundedCircle
                        width={50}
                        height={50}
                        className="me-3"
                      />
                      <div>
                        <blockquote className="blockquote mb-0">
                          <p>Permission: {titleCase(items.role)}</p>
                        </blockquote>
                      </div>
                    </div>
                    <div className="d-flex flex-md-wrap justify-content-around gap-2 mt-3">
                      {button(
                        () => {
                          // change modal header
                          dispatch({
                            type: "CHANGE HEADER",
                            payload: `You are viewing ${titleCase(items.user)}'s details`,
                          });
                          // once clicked show modal
                          dispatch({
                            type: "CHANGE MODAL STATE",
                            payload: true,
                          });
                          // load USERS DETAILS form
                          dispatch({
                            type: "WHICH FORM TO USE",
                            payload: "USERS DETAILS",
                          });
                          // pushed data to view an object in form state
                          dispatch({ type: "FORM DETAILS", payload: items });
                        },
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

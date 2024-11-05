// 3rd party
import { Card, Col, Container, Row, Image } from "react-bootstrap";

// atomic design
import { button } from "../atom";

// custom hooks and utils
import useAppContext from "../../hooks/useAppContext";
import { titleCase } from "../../utils";

/**
 * Displaying of users information in card format
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
const UsersCard = ({ data }) => {
  // state store
  const { dispatch } = useAppContext();

  return (
    <Container>
      <Row>
        {/*display data when it exists another wise show spinner*/}
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
                    {/*view, update and delete buttons on the cards*/}
                    <div className="d-flex flex-md-wrap justify-content-around gap-2 mt-3">
                      {/*View button*/}
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
                      {/*Update button*/}
                      {button(
                        () => {
                          // once clicked show modal
                          dispatch({
                            type: "CHANGE MODAL STATE",
                            payload: true,
                          });
                          // load USERS DETAILS form
                          dispatch({
                            type: "WHICH FORM TO USE",
                            payload: "USERS UPDATE",
                          });
                          // pushed data to view an object in form state
                          dispatch({ type: "FORM DETAILS", payload: items });
                        },
                        "Update",
                        "outline-success",
                      )}
                      {/*Delete button*/}
                      {button(
                        () => {
                          // once clicked show modal
                          dispatch({
                            type: "CHANGE MODAL STATE",
                            payload: true,
                          });
                          // load DELETE FORM
                          dispatch({
                            type: "WHICH FORM TO USE",
                            payload: "USERS DELETE",
                          });
                          // pushed data to view on an object in form state
                          dispatch({ type: "FORM DETAILS", payload: items });
                        },
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

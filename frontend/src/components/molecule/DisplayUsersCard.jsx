import { Card, Col, Image } from "react-bootstrap";
import { titleCase } from "../../utils";
import { button } from "../atom";
import useAppContext from "../../hooks/useAppContext";

const DisplayUserCard = ({ data }) => {
  const { dispatch } = useAppContext();

  return (
    <>
      <Col key={data.id} md={4}>
        <Card className="mb-4 custom-border shadow-lg">
          <Card.Body>
            <Card.Title className="mb-0">
              Username: {titleCase(data.user)}
            </Card.Title>
            <div className="d-flex align-items-center">
              <Image
                src={data.profile_picture}
                roundedCircle
                width={50}
                height={50}
                className="me-3"
              />
              <div>
                <blockquote className="blockquote mb-0">
                  <p>Permission: {titleCase(data.role)}</p>
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
                    payload: `You are viewing ${titleCase(data.user)}'s details`,
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
                  dispatch({ type: "FORM DETAILS", payload: data });
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
                  dispatch({ type: "FORM DETAILS", payload: data });
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
                  dispatch({ type: "FORM DETAILS", payload: data });
                },
                "Delete",
                "outline-danger",
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default DisplayUserCard;

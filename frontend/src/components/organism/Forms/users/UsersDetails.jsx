// 3rd parties
import { Card, Image } from "react-bootstrap";

// atomic design
import DisplayTimeAgo from "../../../molecule/DisplayTimeAgo";
import formatDate from "../../../molecule/FormatDate";
import { button } from "../../../atom";

// custom hooks and utils
import useAppContext from "../../../../hooks/useAppContext";
import { titleCase } from "../../../../utils";
import useFetch from "../../../../hooks/useFetch";

/**
 * Form to display the user's information from a database
 * @returns {JSX.Element}
 * @constructor
 */
const UsersDetails = () => {
  // state store
  const { dispatch, forms, isAdmin } = useAppContext();
  const { view } = forms;

  // destructure view from state store
  const { user, role, profile_picture, property } = view;
  const { created_at, updated_at } = view;

  const { data } = useFetch(`properties/${property}`, property !== null);

  // Calculated time ago
  const { created, updated } = DisplayTimeAgo(created_at, updated_at);

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Image src={profile_picture} width={80} height={80} roundedCircle />
          {titleCase(user)}
        </Card.Title>
        <Card.Subtitle>
          Postcode: {data ? data.area_code : "Unknown"}
        </Card.Subtitle>
        <div>
          <Card.Text>Rent: £ {data ? data.price : 0} per month</Card.Text>
          <Card.Text>Permissions: {titleCase(role)}</Card.Text>
          <Card.Text>Address: {data ? data.address : "Unknown"}</Card.Text>
          <Card.Text>
            Created: {created} on {formatDate(created_at)}
          </Card.Text>
          <Card.Text>
            Last Updated: {updated} on {formatDate(updated_at)}
          </Card.Text>
        </div>
      </Card.Body>

      {/*update and delete buttons*/}
      {isAdmin && (
        <>
          {button(
            () => {
              // once clicked show modal
              dispatch({
                type: "CHANGE MODAL STATE",
                payload: true,
              });
              // load USERS UPDATE form
              dispatch({
                type: "WHICH FORM TO USE",
                payload: "USERS UPDATE",
              });
            },
            "Update User",
            "outline-success",
          )}
          {button(
            () => {
              // once clicked show modal
              dispatch({ type: "CHANGE MODAL STATE", payload: true });
              // load DELETE FORM
              dispatch({ type: "WHICH FORM TO USE", payload: "USERS DELETE" });
            },
            "Delete User",
            "outline-danger",
          )}
        </>
      )}
    </Card>
  );
};

export default UsersDetails;

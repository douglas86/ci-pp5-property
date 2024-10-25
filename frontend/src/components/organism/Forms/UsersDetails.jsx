import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

// atomic design
import DisplayTimeAgo from "../../molecule/DisplayTimeAgo";
import formatDate from "../../molecule/FormatDate";
import { button } from "../../atom";

// custom hooks and utils
import useAppContext from "../../../hooks/useAppContext";
import { titleCase } from "../../../utils";

const UsersDetails = () => {
  // state store
  const { dispatch, forms } = useAppContext();
  const { view } = forms;

  // destructure view from state store
  const { user, area_code, rent, role, profile_picture, address } = view;
  const { created_at, updated_at } = view;

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
          Postcode: {area_code === "None" ? "Unknown" : area_code}
        </Card.Subtitle>
        <div>
          <Card.Text>Rent: £ {rent} per month</Card.Text>
          <Card.Text>Permissions: {titleCase(role)}</Card.Text>
          <Card.Text>
            Address: {address === "None" ? "Unknown" : address}
          </Card.Text>
          <Card.Text>
            Created: {created} on {formatDate(created_at)}
          </Card.Text>
          <Card.Text>
            Last Updated: {updated} on {formatDate(updated_at)}
          </Card.Text>
        </div>
      </Card.Body>
      {/*update and delete buttons*/}
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
    </Card>
  );
};

export default UsersDetails;

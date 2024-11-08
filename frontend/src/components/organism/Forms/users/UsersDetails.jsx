// 3rd parties
import { Card, Image } from "react-bootstrap";

// atomic design
import DisplayTimeAgo from "../../../molecule/DisplayTimeAgo";
import formatDate from "../../../molecule/FormatDate";
import { button, spinner } from "../../../atom";

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
  const { dispatch, forms } = useAppContext();
  const { view } = forms;

  // destructure view from state store
  const { user, role, profile_picture, property } = view;
  const { created_at, updated_at } = view;

  const { data } = useFetch(`properties/${property}`);

  // Calculated time ago
  const { created, updated } = DisplayTimeAgo(created_at, updated_at);

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Image src={profile_picture} width={80} height={80} roundedCircle />
          {titleCase(user)}
        </Card.Title>
        {data ? (
          <Card.Subtitle>
            Postcode: {data.area_code === "None" ? "Unknown" : data.area_code}
          </Card.Subtitle>
        ) : (
          spinner()
        )}
        <div>
          {data ? (
            <Card.Text>Rent: £ {data.price} per month</Card.Text>
          ) : (
            spinner()
          )}
          <Card.Text>Permissions: {titleCase(role)}</Card.Text>
          {data ? (
            <Card.Text>
              Address: {data.address === "None" ? "Unknown" : data.address}
            </Card.Text>
          ) : (
            spinner()
          )}
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

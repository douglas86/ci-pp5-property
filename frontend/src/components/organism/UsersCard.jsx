// 3rd party
import { Container, Row } from "react-bootstrap";

// atomic design
import DisplayUsersCard from "../molecule/DisplayUsersCard";

// custom hooks and utils
import useFetch from "../../hooks/useFetch";

/**
 * Displaying of users information in card format
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
const UsersCard = ({ id }) => {
  // fetch data based on id being passed
  const with_id = useFetch(`profile/me/`, id !== undefined);
  const without_id = useFetch(`profile/`, id === undefined);

  const { data } = id === undefined ? without_id : with_id;

  return (
    <Container>
      <Row>
        {/*display data when if exists or show spinner*/}
        {data ? (
          id === undefined ? (
            data.map((items) => (
              <DisplayUsersCard data={items} key={items.id} />
            ))
          ) : (
            <DisplayUsersCard data={data} />
          )
        ) : null}
      </Row>
    </Container>
  );
};

export default UsersCard;

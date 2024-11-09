// 3rd party
import { Card, Col, Container, Row, Image } from "react-bootstrap";

// atomic design
import { button } from "../atom";

// custom hooks and utils
import useAppContext from "../../hooks/useAppContext";
import { titleCase } from "../../utils";
import useFetch from "../../hooks/useFetch";
import DisplayUsersCard from "../molecule/DisplayUsersCard";

/**
 * Displaying of users information in card format
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
const UsersCard = ({ id }) => {
  // state store
  const { dispatch } = useAppContext();

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

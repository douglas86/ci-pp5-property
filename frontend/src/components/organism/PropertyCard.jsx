// atomic design
import DisplayPropertyCard from "../molecule/DisplayPropertyCard";
import { spinner } from "../atom";

// custom hooks
import useFetch from "../../hooks/useFetch";

// styling
import styles from "../../styles/components/organism/Card.module.css";

/**
 * Displaying of Property in Card format
 * @returns {JSX.Element}
 * @constructor
 */
const PropertyCard = ({ id }) => {
  // fetch property by id if id is not undefined
  const with_id = useFetch(
    `properties/${id}/`,
    id !== undefined && id !== null,
  );
  // fetch property data if id is undefined
  const without_id = useFetch("properties/read/", id === undefined);

  // fetch data
  const { data } = id === undefined ? without_id : with_id;

  return (
    <div className={styles.card}>
      {/*display data when it exists*/}
      {data ? (
        id === undefined ? (
          data.map((items) => (
            <DisplayPropertyCard data={items} key={items.id} />
          ))
        ) : (
          <DisplayPropertyCard data={data} />
        )
      ) : id !== null ? (
        spinner()
      ) : null}
    </div>
  );
};

export default PropertyCard;

// atomic design
import { spinner } from "../atom";

// custom hooks
import useFetch from "../../hooks/useFetch";

// styling
import styles from "../../styles/components/organism/Card.module.css";
import DisplayPropertyCard from "../molecule/DisplayPropertyCard";

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

  console.log("with_id", with_id);
  console.log("without_id", without_id);
  console.log("id", id);

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

// atomic design
import Panel from "../../organism/Admin/Panel";
import PropertyCard from "../../organism/PropertyCard";
import ProtectedAccess from "../../molecule/ProtectedAccess";

// custom hooks
import useAppContext from "../../../hooks/useAppContext";

/**
 * Property page - protected for admin use only
 * @returns {JSX.Element}
 * @constructor
 */
const Property = () => {
  // state store
  const { isAdmin } = useAppContext();

  return (
    <>
      {isAdmin ? (
        <>
          <Panel />
          <PropertyCard />
        </>
      ) : (
        // show protected component is not admin
        <ProtectedAccess message="This is a protected page" />
      )}
    </>
  );
};

export default Property;

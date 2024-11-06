// atomic design
import Panel from "../../organism/Admin/Panel";
import PropertyCard from "../../organism/PropertyCard";
import ProtectedAccess from "../../molecule/ProtectedAccess";

// custom hooks
import useAdmin from "../../../hooks/useAdmin";
import useAppContext from "../../../hooks/useAppContext";

/**
 * Property page - protected for admin use only
 * @returns {JSX.Element}
 * @constructor
 */
const Property = () => {
  // state store
  const { isAdmin } = useAppContext();

  // custom hook for admin check
  // if not logged in or admin show login modal
  useAdmin();

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

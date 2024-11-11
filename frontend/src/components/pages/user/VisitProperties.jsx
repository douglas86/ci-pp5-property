// atomic design
import PropertyCard from "../../organism/PropertyCard";
import ProtectedAccess from "../../molecule/ProtectedAccess";

// custom hooks
import useAppContext from "../../../hooks/useAppContext";

/**
 * Visit the Properties Page
 * @returns {JSX.Element}
 * @constructor
 */
const VisitProperties = () => {
  // state store
  const { isUser, isAdmin } = useAppContext();

  return (
    <>
      {isUser || isAdmin ? (
        <PropertyCard />
      ) : (
        <ProtectedAccess message="You are not authorized to visit this page." />
      )}
    </>
  );
};

export default VisitProperties;

import useAppContext from "../../../hooks/useAppContext";
import ProtectedAccess from "../../molecule/ProtectedAccess";
import PropertyCard from "../../organism/PropertyCard";

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

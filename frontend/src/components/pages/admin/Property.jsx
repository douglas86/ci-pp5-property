import Panel from "../../organism/Admin/Panel";
import useAdmin from "../../../hooks/useAdmin";
import useAppContext from "../../../hooks/useAppContext";
import PropertyCard from "../../organism/PropertyCard";
import ProtectedAccess from "../../molecule/ProtectedAccess";

const Property = () => {
  const { isAdmin } = useAppContext();

  // custom hook for admin check
  useAdmin();

  return (
    <>
      {isAdmin ? (
        <>
          <Panel />
          <PropertyCard />
        </>
      ) : (
        <ProtectedAccess message="This is a protected page" />
      )}
    </>
  );
};

export default Property;

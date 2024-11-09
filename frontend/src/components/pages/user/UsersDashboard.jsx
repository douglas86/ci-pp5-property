import useAppContext from "../../../hooks/useAppContext";
import ProtectedAccess from "../../molecule/ProtectedAccess";
import PropertyCard from "../../organism/PropertyCard";

const UserDashboard = () => {
  // state store
  const { isUser, user } = useAppContext();

  return (
    <>
      {isUser ? (
        <PropertyCard id={user.property} />
      ) : (
        <ProtectedAccess message="This is a protected page" />
      )}
    </>
  );
};

export default UserDashboard;

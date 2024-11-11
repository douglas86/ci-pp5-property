// atomic design
import PropertyCard from "../../organism/PropertyCard";
import UsersCard from "../../organism/UsersCard";
import ProtectedAccess from "../../molecule/ProtectedAccess";

// custom hooks
import useAppContext from "../../../hooks/useAppContext";

/**
 * Displaying of the Users Dashboard Page
 * @returns {JSX.Element}
 * @constructor
 */
const UserDashboard = () => {
  // state store
  const { isUser, user } = useAppContext();

  return (
    <>
      {isUser ? (
        <>
          <UsersCard id={user.id} />
          <PropertyCard id={user.property} />
        </>
      ) : (
        <ProtectedAccess message="This is a protected page" />
      )}
    </>
  );
};

export default UserDashboard;

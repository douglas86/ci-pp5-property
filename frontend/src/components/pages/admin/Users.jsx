// atomic design
import Panel from "../../organism/Admin/Panel";
import UsersCard from "../../organism/UsersCard";
import ProtectedAccess from "../../molecule/ProtectedAccess";

// custom hooks
import useAppContext from "../../../hooks/useAppContext";
import useFetch from "../../../hooks/useFetch";

/**
 * User page - protected for admin use only
 * @returns {JSX.Element}
 * @constructor
 */
const Users = () => {
  // state store
  const { isAdmin, refreshData } = useAppContext();

  // fetch from a database if user isAdmin or refreshData flag is true
  const { data } = useFetch("profile/", isAdmin || refreshData);

  return (
    <>
      {isAdmin ? (
        <>
          <Panel />
          <UsersCard data={data} />
        </>
      ) : (
        // show protected component is not admin
        <ProtectedAccess message="This is a protected page" />
      )}
    </>
  );
};

export default Users;

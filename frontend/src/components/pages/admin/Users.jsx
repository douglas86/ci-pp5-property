// atomic design
import Panel from "../../organism/Admin/Panel";
import UsersCard from "../../organism/UsersCard";
import ProtectedAccess from "../../molecule/ProtectedAccess";

// custom hooks
import useAdmin from "../../../hooks/useAdmin";
import useAppContext from "../../../hooks/useAppContext";
import useFetch from "../../../hooks/useFetch";

/**
 * User page - protected for admin use only
 * @returns {JSX.Element}
 * @constructor
 */
const Users = () => {
  // state store
  const { isAdmin } = useAppContext();

  // only fetch data is isAdmin is true
  const { data } = useFetch("profile/", isAdmin);

  // custom hook for admin check
  // if not logged in or admin show login modal
  useAdmin();

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

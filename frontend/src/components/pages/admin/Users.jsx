// atomic design
import Panel from "../../organism/Admin/Panel";

// custom hooks
import useAdmin from "../../../hooks/useAdmin";
import useAppContext from "../../../hooks/useAppContext";
import useFetch from "../../../hooks/useFetch";
import UsersCard from "../../organism/UsersCard";
import ProtectedAccess from "../../molecule/ProtectedAccess";

const Users = () => {
  const { isAdmin } = useAppContext();

  const { data } = useFetch("profile/", isAdmin);

  // custom hook for admin check
  useAdmin();

  return (
    <>
      {isAdmin ? (
        <>
          <Panel />
          <UsersCard data={data} />
        </>
      ) : (
        <ProtectedAccess message="This is a protected page" />
      )}
    </>
  );
};

export default Users;

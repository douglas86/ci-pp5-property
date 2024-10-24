// atomic design
import Panel from "../../organism/Admin/Panel";

// custom hooks
import useAdmin from "../../../hooks/useAdmin";
import useAppContext from "../../../hooks/useAppContext";
import useFetch from "../../../hooks/useFetch";
import UsersCard from "../../organism/UsersCard";

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
        <h1>This is a protected page please login</h1>
      )}
    </>
  );
};

export default Users;

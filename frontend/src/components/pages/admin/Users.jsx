// atomic design
import Panel from "../../organism/Admin/Panel";

// custom hooks
import useAdmin from "../../../hooks/useAdmin";
import useAppContext from "../../../hooks/useAppContext";
import useFetch from "../../../hooks/useFetch";
import DescriptiveContent from "../../molecule/DescriptiveContent";

const Users = () => {
  const { isAdmin } = useAppContext();

  const { data } = useFetch("profile/", isAdmin);

  // custom hook for admin check
  useAdmin();

  console.log("data", data);

  return (
    <>
      {isAdmin ? (
        <>
          <Panel />
        </>
      ) : (
        <h1>This is a protected page please login</h1>
      )}
    </>
  );
};

export default Users;

// atomic design
import Panel from "../../organism/Admin/Panel";
import DataTable from "../../organism/Admin/DataTable";

// custom hooks
import useAdmin from "../../../hooks/useAdmin";
import useAppContext from "../../../hooks/useAppContext";
import useFetch from "../../../hooks/useFetch";

const Users = () => {
  const { isAdmin } = useAppContext();

  const { data } = useFetch("profile/", isAdmin);

  console.log("data", data);

  // custom hook for admin check
  useAdmin();

  console.log("isAdmin", isAdmin);

  const heading = [
    "#",
    "",
    "Name of Person",
    "Address",
    "Area code",
    "Role",
    "Rent",
  ];
  const body = [
    1,
    "image",
    "name of person",
    "address of property",
    "area code",
    "user",
    "£ 1000",
  ];

  return (
    <>
      {isAdmin ? (
        <>
          <Panel />
          <DataTable heading={heading} body={data} />
        </>
      ) : (
        <h1>This is a protected page please login</h1>
      )}
    </>
  );
};

export default Users;

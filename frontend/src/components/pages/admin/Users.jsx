// atomic design
import Panel from "../../organism/Admin/Panel";
import DataTable from "../../organism/Admin/DataTable";

// custom hooks
import useAdmin from "../../../hooks/useAdmin";
import useAppContext from "../../../hooks/useAppContext";

const Users = () => {
  const { isAdmin } = useAppContext();

  // custom hook for admin check
  useAdmin();

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
          <DataTable heading={heading} body={body} />
        </>
      ) : (
        <h1>This is a protected page please login</h1>
      )}
    </>
  );
};

export default Users;

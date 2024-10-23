import Panel from "../../organism/Admin/Panel";
import useAdmin from "../../../hooks/useAdmin";
import useAppContext from "../../../hooks/useAppContext";
import DataTable from "../../organism/Admin/DataTable";

const Users = () => {
  const { isAdmin } = useAppContext();

  // custom hook for admin check
  useAdmin();

  const heading = ["#", "", "Address", "Area", "Area code", "Rent"];
  const body = [
    1,
    "image",
    "address of property",
    "area of property",
    "area code",
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

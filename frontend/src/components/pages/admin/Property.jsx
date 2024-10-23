import Panel from "../../organism/Admin/Panel";
import useAdmin from "../../../hooks/useAdmin";
import useAppContext from "../../../hooks/useAppContext";

const Property = () => {
  const { isAdmin } = useAppContext();

  // custom hook for admin check
  useAdmin();

  return (
    <>{isAdmin ? <Panel /> : <h1>This is a protected page please login</h1>}</>
  );
};

export default Property;

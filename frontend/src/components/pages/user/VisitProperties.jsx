import useAppContext from "../../../hooks/useAppContext";
import ProtectedAccess from "../../molecule/ProtectedAccess";

const VisitProperties = () => {
  // state store
  const { isUser, isAdmin } = useAppContext();

  return (
    <>
      {isUser || isAdmin ? (
        <p>Visiting Properties</p>
      ) : (
        <ProtectedAccess message="You are not authorized to visit this page." />
      )}
    </>
  );
};

export default VisitProperties;

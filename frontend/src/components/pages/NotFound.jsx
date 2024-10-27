import ProtectedAccess from "../molecule/ProtectedAccess";

const NotFound = () => {
  return (
    <div>
      <ProtectedAccess
        message="The Page that you are looking for does not exist?"
        restricted={false}
      />
    </div>
  );
};

export default NotFound;

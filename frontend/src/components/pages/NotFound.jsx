// atomic design
import ProtectedAccess from "../molecule/ProtectedAccess";

/**
 * If all other pages fails this is shown
 * @returns {JSX.Element}
 * @constructor
 */
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

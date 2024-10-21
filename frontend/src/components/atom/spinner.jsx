// 3rd parties
import Spinner from "react-bootstrap/Spinner";

/**
 * This spinner is used to show that data is being loaded
 * @returns {JSX.Element}
 */
export const spinner = () => (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

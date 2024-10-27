// 3rd party
import Image from "react-bootstrap/Image";

// assets
import Protected from "../../assets/images/protected.png";
import NotFound from "../../assets/images/not_found.png";

// styling
import styles from "../../styles/components/molecule/Protected.module.css";

const ProtectedAccess = ({ message, restricted = true }) => {
  return (
    <>
      <h1 className={`d-flex align-items-center justify-content-center`}>
        {message}
      </h1>
      <div className={`d-flex align-items-center justify-content-center`}>
        {restricted ? (
          <Image
            src={`${Protected}`}
            className={styles.image}
            alt="Protected Access"
          />
        ) : (
          <Image
            src={`${NotFound}`}
            className={styles.image}
            alt="Protected Access"
          />
        )}
      </div>
    </>
  );
};

export default ProtectedAccess;

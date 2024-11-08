import { useNavigate } from "react-router-dom";

// atomic design
import CarouselContent from "../organism/CarouselContent";
import Cards from "../organism/Cards";
import DescriptiveContent from "../molecule/DescriptiveContent";
import PageTitle from "../molecule/PageTitle";
import { button, title } from "../atom";

// custom hooks
import useAppContext from "../../hooks/useAppContext";

// styling
import styles from "../../styles/components/pages/LandingPage.module.css";

/**
 * Home Page
 * @returns {JSX.Element}
 * @constructor
 */
const LandingPage = () => {
  // state store
  const { isUser, isAdmin } = useAppContext();

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <PageTitle />
      <div className={styles.btn}>
        {isUser || isAdmin
          ? button(() => navigate("/properties"), "Search Properties", "dark")
          : title("Please Login to visit Properties?")}
      </div>
      <CarouselContent />
      <DescriptiveContent
        heading="Testimonials"
        subTitle="Have a look at what previous customers are saying!"
      />
      <Cards />
    </div>
  );
};

export default LandingPage;

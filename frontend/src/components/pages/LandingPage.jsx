// atomic design
import CarouselContent from "../organism/CarouselContent";
import Cards from "../organism/Cards";
import DescriptiveContent from "../molecule/DescriptiveContent";
import PageTitle from "../molecule/PageTitle";

// styling
import styles from "../../styles/components/pages/LandingPage.module.css";

/**
 * Home Page
 * @returns {JSX.Element}
 * @constructor
 */
const LandingPage = () => {
  return (
    <div className={styles.container}>
      <PageTitle />
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

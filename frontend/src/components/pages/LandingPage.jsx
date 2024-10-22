import CarouselContent from "../organism/CarouselContent";

import styles from "../../styles/components/pages/LandingPage.module.css";
import DescriptiveContent from "../molecule/DescriptiveContent";
import Cards from "../organism/Cards";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <CarouselContent />
      <div className={styles.testimonials}>
        <DescriptiveContent
          heading="Testimonials"
          subTitle="Have a look what previous customers are saying"
        />
      </div>
      <Cards />
    </div>
  );
};

export default LandingPage;

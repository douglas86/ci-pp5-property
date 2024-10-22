import CarouselContent from "../organism/CarouselContent";

import styles from "../../styles/components/pages/LandingPage.module.css";
import DescriptiveContent from "../molecule/DescriptiveContent";
import Cards from "../organism/Cards";
import PageTitle from "../molecule/PageTitle";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <PageTitle />
      <CarouselContent />
      <DescriptiveContent
        heading="Testimonials"
        subTitle="Have a look what previous customers are saying"
      />
      <Cards />
    </div>
  );
};

export default LandingPage;

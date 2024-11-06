// 3rd party
import Image from "react-bootstrap/Image";

// atomic design
import PageTitle from "../molecule/PageTitle";
import DescriptiveContent from "../molecule/DescriptiveContent";

// assets
import House from "../../assets/images/house.png";

// styling
import styles from "../../styles/components/pages/AboutPage.module.css";

/**
 * About the London Properties Website Page
 * @returns {JSX.Element}
 * @constructor
 */
const AboutPage = () => {
  return (
    <div>
      <PageTitle />
      <div className={styles.content}>
        <div className={styles.left}>
          <DescriptiveContent
            heading="About US"
            subTitle="This is just a little detail about the best Properties in London"
            paragraph="Welcome to London Properties, the best website in the Property sector. Weather you are looking to buy, rent or sell. I am sure that we can find the correct property for you."
          />
        </div>
        <div className={styles.right}>
          <Image src={`${House}`} alt="House" fluid />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <DescriptiveContent
            heading="Our Mission"
            subTitle=""
            paragraph="Our Mission is to help empower you with the tools, information and support that you need to help you with achieving your vision to obtain your next property."
          />
        </div>
        <div className={styles.right}>
          <DescriptiveContent
            heading="Our Commitment"
            subTitle=""
            paragraph="We are committed to transparency, integrity and honesty in everything we do. Our goal is to build long lasting relationships with our clients. Your satisfaction is our number 1 priority."
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

import PageTitle from "../molecule/PageTitle";
import DescriptiveContent from "../molecule/DescriptiveContent";

import style from "../../styles/components/pages/AboutPage.module.css";
import Image from "react-bootstrap/Image";
import House from "../../assets/images/house.png";

const AboutPage = () => {
  return (
    <div>
      <PageTitle />
      <div className={style.content}>
        <div className={style.left}>
          <DescriptiveContent
            heading="About US"
            subTitle="This is just a little detail about the best Properties in London"
            paragraph="Welcome to London Properties, the best website in the Property sector. Weather you are looking to buy, rent or sell. I am sure that we can find the correct property for you."
          />
        </div>
        <div className={style.right}>
          <Image src={`${House}`} alt="House" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

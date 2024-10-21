import PageTitle from "../molecule/PageTitle";
import DescriptiveContent from "../molecule/DescriptiveContent";

const AboutPage = () => {
  return (
    <div>
      <PageTitle />
      <DescriptiveContent
        heading="About US"
        subTitle="This is just a little detail about the best Properties in London"
        paragraph="Welcome to London Properties, the best website in the Property sector. Weather you are looking to buy, rent or sell. I am sure that we can find the correct property for you."
      />
    </div>
  );
};

export default AboutPage;

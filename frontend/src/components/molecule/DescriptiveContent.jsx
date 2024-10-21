import { subHeading, text, title } from "../atom";

import style from "../../styles/components/molecule/DescriptiveContent.module.css";

const DescriptiveContent = ({ heading, subTitle, paragraph }) => {
  return (
    <div className={style.descriptiveContent}>
      {title(heading)}
      {subHeading(subTitle)}
      {text(paragraph)}
    </div>
  );
};

export default DescriptiveContent;

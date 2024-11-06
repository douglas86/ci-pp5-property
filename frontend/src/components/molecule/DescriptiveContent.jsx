// atomic design
import { subHeading, text, title } from "../atom";

// styling
import style from "../../styles/components/molecule/DescriptiveContent.module.css";

/**
 * This molecule is used to display sections of a text together
 * @param heading
 * @param subTitle
 * @param paragraph
 * @returns {JSX.Element}
 * @constructor
 */
const DescriptiveContent = ({ heading, subTitle, paragraph }) => {
  return (
    <div className={style.descriptiveContent}>
      {title(heading)}
      {subTitle ? subHeading(subTitle) : null}
      {text(paragraph)}
    </div>
  );
};

export default DescriptiveContent;

// styling
import style from "../../styles/components/atom/Atom.module.css";

/**
 * a properly formatted heading of a page
 * @param string
 * @returns {JSX.Element}
 */
export const heading = (string) => (
  <h1 className={`text-center ${style.h1}`}>{string}</h1>
);

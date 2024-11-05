import style from "../../styles/components/atom/Atom.module.css";

/**
 * This atom is used for showing a short description under the heading element
 * @param string
 * @returns {JSX.Element}
 */
export const subHeading = (string) => (
  <p className={`text-center ${style.p}`}>{string}</p>
);

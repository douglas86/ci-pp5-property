import style from "../../styles/components/atom/Atom.module.css";

/**
 * This atom is used for a title of a section followed by paragraphs after it
 * @param title
 * @returns {JSX.Element}
 */
export const title = (title) => (
  <h3 className={`text-center ${style.h3}`}>{title}</h3>
);

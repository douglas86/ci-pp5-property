import style from "../../styles/components/atom/Atom.module.css";

/**
 * showing of a text normally for were you need to display paragraphs
 * @param string
 * @returns {JSX.Element}
 */
export const text = (string) => (
  <p className={`text-center ${style.text}`}>{string}</p>
);

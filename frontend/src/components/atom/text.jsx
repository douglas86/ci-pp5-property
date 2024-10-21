import style from "../../styles/components/atom/Atom.module.css";

export const text = (string) => (
  <p className={`text-center ${style.text}`}>{string}</p>
);

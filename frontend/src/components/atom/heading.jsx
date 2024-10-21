import style from "../../styles/components/atom/Atom.module.css";

export const heading = (string) => (
  <h1 className={`text-center ${style.h1}`}>{string}</h1>
);

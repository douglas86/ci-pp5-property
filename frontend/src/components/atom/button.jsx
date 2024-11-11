// 3rd party
import { Button } from "react-bootstrap";

/**
 * Display bootstrap button
 * @param clickHandler - can take either a clickHandler or the string "submit" for submit button
 * @param text - text that you want displayed on the button
 * @param variant - follows variant colors from react-bootstrap
 * @returns {JSX.Element}
 */
export const button = (clickHandler, text, variant) =>
  clickHandler === "submit" ? (
    <Button type="submit" variant={variant}>
      {text}
    </Button>
  ) : (
    <Button onClick={clickHandler} variant={variant}>
      {text}
    </Button>
  );

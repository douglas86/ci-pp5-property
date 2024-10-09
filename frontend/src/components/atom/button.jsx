import { Button } from "react-bootstrap";

export const button = (clickHandler, text, variant = null) =>
  variant ? (
    <Button onClick={clickHandler} variant={variant}>
      {text}
    </Button>
  ) : (
    <Button onClick={clickHandler}>{text}</Button>
  );

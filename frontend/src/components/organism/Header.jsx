// 3rd party
import { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

// atomic design
import FormModal from "./FormModal";
import { logo, button } from "../atom";

// utils and hooks
import { router } from "../../utils";
import useAppContext from "../../hooks/useAppContext";

// styling
import styles from "../../styles/components/organism/Header.module.css";

const Header = () => {
  const [open, setOpen] = useState(false);

  const { dispatch, user } = useAppContext();

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand href="/">{logo()}</Navbar.Brand>
        <Button
          aria-controls="navbar-collapse"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="navbar-toggler"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>

        <Navbar.Collapse
          in={open}
          id="navbar-collapse"
          className="justify-content-end"
        >
          <Nav className={`ms-auto ${styles.nav}`}>
            {router.map(({ id, title, path }) => (
              <Nav.Link key={id} href={path}>
                <h4>{title}</h4>
              </Nav.Link>
            ))}
            {user
              ? button(
                  () => {
                    dispatch({ type: "WHICH FORM TO USE", payload: "LOGOUT" });
                    dispatch({ type: "CHANGE MODAL STATE", payload: true });
                  },
                  "Logout",
                  "dark",
                )
              : button(
                  () => {
                    dispatch({ type: "WHICH FORM TO USE", payload: "" });
                    dispatch({ type: "CHANGE MODAL STATE", payload: true });
                  },
                  "Login",
                  "dark",
                )}
            <FormModal />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

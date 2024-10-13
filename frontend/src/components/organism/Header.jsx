import { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

import { logo } from "../atom";

import { router } from "../../utils";

import styles from "../../styles/components/organism/Header.module.css";
import { button } from "../atom";
import FormModal from "./FormModal";
import useAppContext from "../../hooks/useAppContext";

const Header = () => {
  const [open, setOpen] = useState(false);

  const { dispatch } = useAppContext();

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
            {button(
              () => dispatch({ type: "CHANGE MODAL STATE", payload: true }),
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

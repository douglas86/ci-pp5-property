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

/**
 * Header organism gets displayed on all pages
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
  // opening and closing of the hamburger menu
  // on tablet and smaller devices
  const [open, setOpen] = useState(false);

  // state store
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
            {/*Authentication buttons for Login and Logout*/}
            {user
              ? // Logout button
                button(
                  () => {
                    dispatch({ type: "WHICH FORM TO USE", payload: "LOGOUT" });
                    dispatch({ type: "CHANGE MODAL STATE", payload: true });
                  },
                  "Logout",
                  "dark",
                )
              : // Login button
                button(
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

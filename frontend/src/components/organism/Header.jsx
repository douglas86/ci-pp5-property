// 3rd party
import { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

// atomic design
import FormModal from "./FormModal";
import { logo, button } from "../atom";

// utils and hooks
import useAppContext from "../../hooks/useAppContext";
import { router } from "../../utils";

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

  // check to see what role user plays
  const isRole = (role) => user.role === role;

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
            {/*Display links on Navbar*/}
            {router.map(({ id, title, path, role }) => (
              <div key={id}>
                {/*check if user is logged in*/}
                {user ? (
                  // display a dashboard link based on a user role
                  <>
                    {/*display all other routes except protected*/}
                    {!role && (
                      <Nav.Link href={path}>
                        <h4>{title}</h4>
                      </Nav.Link>
                    )}
                    {/*display dashboard based on users' role*/}
                    {isRole(role) && (
                      <Nav.Link href={path}>
                        <h4>{title}</h4>
                      </Nav.Link>
                    )}
                  </>
                ) : (
                  <>
                    {/*check to see if protected route*/}
                    {/*if protected display null*/}
                    {role ? null : (
                      <Nav.Link href={path}>
                        <h4>{title}</h4>
                      </Nav.Link>
                    )}
                  </>
                )}
              </div>
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

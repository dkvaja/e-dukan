/* eslint-disable eqeqeq */
import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth-listener";
import { useProfile } from "../../hooks/use-profile-listener";
import { logOutUser } from "../../services/auth";

const NavBar = () => {
  const { profile } = useProfile();

  const { user } = useAuth();

  const handleLogOut = async () => {
    await logOutUser();
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          E-Dukan
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {profile?.userType == 1 && (
              <Nav.Link as={NavLink} to="/addProduct">
                Add Product
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {user && (
              <Button variant="outline-light" onClick={handleLogOut}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

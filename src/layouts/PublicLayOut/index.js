import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";

const PublicLayOut = () => {
  return (
    <Container
      fluid
      className="p-0 d-flex justify-content-center flex-column w-100 vh-100"
    >
      <NavBar />
      <Outlet />
    </Container>
  );
};

export default PublicLayOut;

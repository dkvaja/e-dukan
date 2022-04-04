import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";

const DashBoardLayOut = () => {
  return (
    <Container fluid className="p-0">
      <NavBar />
      <Container className="py-5">
        <Outlet />
      </Container>
    </Container>
  );
};

export default DashBoardLayOut;

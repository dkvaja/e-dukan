import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Container
      fluid
      className="p-0 w-100 vh-100 d-flex justify-content-center align-items-center"
    >
      <Spinner animation="border" variant="primary" />
    </Container>
  );
};

export default Loader;

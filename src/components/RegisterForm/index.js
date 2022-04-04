import React, { useState } from "react";
import { Form, Button, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { registerUser } from "../../services/auth";

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    displayName: "",
    userType: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    } else {
      await registerUser(userData);
    }
  };

  return (
    <Container className="w-100 d-flex justify-content-center align-items-center h-100">
      <Form
        className="w-25"
        noValidate
        validated={validated}
        onSubmit={handleRegister}
      >
        <h2 className="text-center">Register</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="displayName"
            placeholder="Enter name"
            onChange={handleOnChange}
            value={userData.displayName}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleOnChange}
            value={userData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Type</Form.Label>
          <Form.Select
            name="userType"
            aria-label="Default select example"
            onChange={handleOnChange}
            value={userData.userType}
            required
          >
            <option value={0}>Buyer</option>
            <option value={1}>Seller</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please enter a valid role
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
            value={userData.password}
            required
          />
        </Form.Group>
        <Nav.Link as={NavLink} className="px-0" to="/auth/login">
          Already have an account?
        </Nav.Link>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;

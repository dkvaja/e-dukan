import React, { useState } from "react";
import { Form, Button, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { logInUser } from "../../services/auth";

const LogInForm = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserLoginData({
      ...userLoginData,
      [name]: value,
    });
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      const res = await logInUser(userLoginData);
      if (res) {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <Container className="w-100 d-flex justify-content-center align-items-center h-100">
      <Form
        className="w-25"
        noValidate
        validated={validated}
        onSubmit={handleLogIn}
      >
        <h2 className="text-center">Log In</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleOnChange}
            value={userLoginData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
            value={userLoginData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid password
          </Form.Control.Feedback>
        </Form.Group>
        <Nav.Link as={NavLink} className="px-0" to="/auth/register">
          Don't have an account?
        </Nav.Link>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </Container>
  );
};

export default LogInForm;

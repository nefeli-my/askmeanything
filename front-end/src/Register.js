import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import login from './assets/login.png'
import './css/Register.css';

const Register = () => {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [password_reset, setPassReset] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0 &&
    first_name.length > 0 && last_name.length &&
    (password == password_reset);
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div className="register">
      <nav>
        <h1><b>ask</b>me<b>anything</b></h1>
      </nav>
      <div className="register-form">
        <Form onSubmit={handleSubmit}>
          <h3><b> Sign Up </b></h3>
          <Form.Group size="lg" controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsename(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password_reset">
            <Form.Label>Reset Password</Form.Label>
            <Form.Control
              type="password"
              value={password_reset}
              onChange={(e) => setPassReset(e.target.value)}
            />
          </Form.Group>
          <Button className="b1" block variant="outline-primary" type="submit" disabled={!validateForm()}>
            Create Account
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap";
import login from './assets/login.png'
import './css/Login.css';

const Login = () => {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div className="login">
      <nav>
        <h1><b>ask</b>me<b>anything</b></h1>
      </nav>
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <img src={login} />
          <h3><b> Sign In </b></h3>
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
          <Button className="b1" block variant="outline-primary" type="submit" disabled={!validateForm()}>
            Sign In
          </Button>
          <hr/>
          <Link to ="/register">
            <Button block variant="outline-secondary">
              Create a New Account
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;

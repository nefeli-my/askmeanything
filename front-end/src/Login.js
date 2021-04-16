import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import login from './assets/login1.png'

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
    <div className="Login">
      <nav className="login">
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
          <Button block variant="outline-secondary">
            Create a New Account
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;

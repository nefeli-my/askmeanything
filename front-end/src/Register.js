import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import login from './assets/login.png'
import './css/Register.css';
import { useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [password_reset, setPassReset] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0 &&
    first_name.length > 0 && last_name.length &&
    (password === password_reset) && email.length > 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
    const user = { username, password, firstName: first_name, lastName: last_name, email };

    fetch('http://localhost:3000/register/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(res => {
      if(res.status === 201 ){
        history.push('/login');
      }
      else{
        //something to indicate user already exists
        //for now, just print it in console
        console.log("user exists")
      }
    })
        .catch(err => console.log(err))
  }
  return (
    <div className="register">
      <nav>
        <h1><b>ask</b>me<b>anything</b></h1>
      </nav>
      <div className="register-form">
        <Form onSubmit={handleSubmit}>
          <h3><b> Sign Up </b></h3>
          <Form.Group controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsename(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password_reset">
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

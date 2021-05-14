import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './css/Register.css';
import { useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [password_reset, setPassReset] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    if (password !== password_reset) {
      setError("Password confirmation failed.");
      return;
    }
    //else if (password.length <= 5 || !(/\d/.test(password))) {
    // ....
    //  return;
    //}
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
        setError("User already exists. Please enter a different username or e-mail address to create a new account.");
        console.log("user exists");
      }
    })
        .catch(err => console.log(err))
  }
  return (
    <div className="register">
      <div className="register-form">
        <Form onSubmit={handleSubmit}>
          <h3><b> Sign Up </b></h3>
          <Form.Group controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              required
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              autoFocus
              required
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              required
              type="text"
              value={username}
              onChange={(e) => setUsename(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                autoFocus
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password_reset">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password_reset}
              onChange={(e) => setPassReset(e.target.value)}
            />
          </Form.Group>
          <Button className="b1" block variant="outline-primary" type="submit">
            Create Account
          </Button>
          <a href="/login" className="back-login"> back to login </a>
        </Form>
      </div>
      {error && <p className="error"> {error} </p>}
    </div>
  );
}

export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap";
import '../css/Login.css';
import login from '../assets/login.png'
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    const user = { username, password };
    fetch('http://localhost:8001/login/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
      })
    .then(res => {
      if(res.status === 200 ){
        res.json()
        .then(token => {
          localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
          localStorage.setItem('username', user.username)
          history.push('/home');
        })
      }
      else{
        setError("The username or password you've inserted is incorrect. Please try again.");
        console.log("user invalid");
      }
    })
    .catch(err => console.log(err));
  }
  return (
    <div className="login">
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <img src={login} alt="talk bubble"/>
          <h3><b> Sign In </b></h3>
          <Form.Group size="lg" controlId="username">
            <Form.Label className="label">Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="btn-1" block variant="outline-primary" type="submit">
            Sign In
          </Button>
          <hr/>
          <Link to ="/register">
            <Button className="btn-2" block variant="outline-secondary">
              Create a New Account
            </Button>
          </Link>
        </Form>
      </div>
      {error && <p className="error"> {error} </p>}
    </div>
  );
}

export default Login;
import React, { useState, useEffect } from "react";
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
  const isLoggedIn = localStorage.getItem('REACT_TOKEN_AUTH');

  useEffect(() => {
    if (isLoggedIn){
      history.push('/');
    }
  }, [isLoggedIn, history]);

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
          localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token.accessToken));
          localStorage.setItem('username', user.username)
          history.push('/');
        })
      }
      else if (res.status === 401){
        setError("The username or password you've inserted is incorrect. Please try again.");
      }
      else{
        setError(`An internal error occurred`)
      }
    })
    .catch(err => setError(err.message));
  }
  return (
    <div className="login">
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <img src={login} alt="talk bubble"/>
          <h3><b> Sign In </b></h3>
          <Form.Group>
            <Form.Label className="label">Username</Form.Label>
            <Form.Control
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
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

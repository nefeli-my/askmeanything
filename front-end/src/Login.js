import React, { useState } from "react";
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap";
import login from './assets/login.png'
import './css/Login.css';
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
    const user = { username, password };

    fetch('http://localhost:3000/login/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(res => {
      if(res.status === 200 ){
          res.json()
            .then( token => {
              localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
              history.push('/home');
            })
      }
      else{
        //something to indicate user credentials are wrong
        //for now, just print it in console
        console.log("user invalid")
      }
    })
        .catch(err => console.log(err))
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
              onChange={(e) => setUsername(e.target.value)}
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
            <Button className="b2" block variant="outline-secondary">
              Create a New Account
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;

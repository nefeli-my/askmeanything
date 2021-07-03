import React, {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import '../css/Login.css';
import login from '../assets/login.png'
import { useHistory } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Login = () => {
  // login form page
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = localStorage.getItem('askmeanything_token');
  const history = useHistory();

  useEffect(() => {
    // in case the user is already logged in and somehow
    // accessed the '/login' path, redirect to his homepage
    if (isLoggedIn){
      history.push('/');
    }
  }, [isLoggedIn, history]);

  function handleSubmit(event) {
    // post request to login endpoint of authenticator service
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
          // store token and username in local storage in case of
          // successful login, and then redirect to homepage
          localStorage.setItem('askmeanything_token', JSON.stringify(token.accessToken));
          localStorage.setItem('username', user.username);
          NotificationManager.success('Successful login', 'Success!', 2000);
          setTimeout(() => history.push('/'), 2000);
        })
      }
      // error handling
      else if (res.status === 401){
        console.log('401 Unauthorized Error');
        NotificationManager.error('The username or password you\'ve inserted is incorrect. Please try again.','Error');
      }
      else if (res.status === 400){
        console.log('400 Bad Request Error');
        NotificationManager.error('Please make sure you have filled in all required fields (username and password).','Error');
      }
      else {
        console.log('500 Internal Server Error');
        history.push('/error-500');
      }
    })
    .catch(err => {
       console.log(err);
       history.push('/error-500');
    });
  }
  return (
    <div className="login">
      {/* login form */}
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

          <Button
            className="btn-1"
            block variant="outline-primary"
            type="submit"
          >
            Sign In
          </Button>

          <hr/>

          <Button
            className="btn-2"
            block variant="outline-secondary"
            onClick={() => history.push('/register')}
          >
            Create a New Account
          </Button>
        </Form>
      </div>
      <NotificationContainer/>
    </div>
  );
}

export default Login;

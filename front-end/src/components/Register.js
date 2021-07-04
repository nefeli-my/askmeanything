import React, {useState} from "react";
import {Form, Button, Col} from "react-bootstrap";
import '../css/Register.css';
import {useHistory} from "react-router-dom";
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Register = () => {
  // register page
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [password_reset, setPassReset] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    // compare password and confirmation password
    if (password !== password_reset) {
      NotificationManager.error('Password confirmation failed.','Error');
      return;
    }
    // user registration through the authenticator service
    const user = { username: username, password: password, firstName: first_name, lastName: last_name, email: email };
    fetch(process.env.REACT_APP_AUTH_URL + 'register/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    .then(res => {
      if(res.status === 201){
        // push to login page right after successful user registration
        NotificationManager.success('Account successfully created!','Success!', 2000);
        history.push('/login');
      }
      // error handling
      else if (res.status === 400){
        console.log('400 Bad Request Error');
        NotificationManager.error('A user with the same email and/or username already exists. Please try again!','Error');
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
    <div className="register">
      {/* register form                             *
        * username, email, first name, last name    *
        * password and confirmation password needed */}
      <div className="register-form">
        <Form onSubmit={handleSubmit}>
          <h3><b> Sign Up. It's free! </b></h3>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="label"
                required
                placeholder="Enter first name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="label"
                required
                placeholder="Enter last name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
            />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="label"
                required
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsename(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                className="label"
                type="email" required
                placeholder="example: user@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="label"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control className="label"
                type="password"
                required
                value={password_reset}
                onChange={(e) => setPassReset(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Button variant="outline-primary" className="btn-1" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
      
    </div>
  );
}

export default Register;

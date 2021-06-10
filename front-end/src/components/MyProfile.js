import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/MyProfile.css';

const MyProfile = () => {
  // user's account info
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registeredAt, setRegisteredAt] = useState('');
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('REACT_TOKEN_AUTH');
  const history = useHistory();

  function showRegDate() {
    let newDate = (new Date(registeredAt)).toLocaleString('en-GB');
    return newDate.substring(0,8);
  }

  useEffect(() => {
    // fetch user's account information when component is mounted
    // authenticator service endpoint accessed
    fetch('http://localhost:8001/get',
        {
          method: 'GET',
          headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)}
        })
        .then(function (res) {
              if (res.status === 200) {
                res.json()
                    .then(function (data) {
                      // set user's information
                      setEmail(data[0].email);
                      setFirstName(data[0].firstName);
                      setLastName(data[0].lastName);
                      setRegisteredAt(data[0].createdAt);
                    })
              // error handling
              } else if (res.status === 401) {
                console.log('401 Unauthorized Error');
                alert('Your session expired. Please login again.');
                localStorage.removeItem('REACT_TOKEN_AUTH');
                history.push('/login');
              } else if (res.status === 400) {
                console.log('400 Bad Request');
              } else {
                console.log('500 Internal Server Error');
                history.push('/error-500');
              }
            }
        );
  }, [token, history]);

  return (
    <div>
      <Navbar/>
      <div className="my-profile">
        {/* small navigation bar */}
        <nav>
          <a href="/profile">Account information</a>
          <a href="/my-statistics">My askmeanything statistics</a>
        </nav>
        {/* display user's current account information */}
        <div className="account-info">
          <h3><b> Current Account Information: </b></h3>
          {/* use in-line stylying for the display */}
          <div className="info-line">
            <p><b>Username:</b></p> <p id="username-state"> {username} </p>
          </div>
          <div className="info-line">
            <p><b>Email Address:</b></p> <p id="email-state"> {email} </p>
          </div>
          <div className="info-line">
            <p><b>Full Name:</b></p> <p id="fullname-state"> {firstName} {lastName} </p>
          </div>
          <div className="info-line">
            <p><b>Registered since:</b></p> <p id="date-state"> {showRegDate()} </p>
          </div>
        </div>
        {/* links to update components */}
        <div className="update-links">
          <Link to="/update-password" className="link">
            Reset password
          </Link> <br/>
          <Link to="/update-name" className="link">
            Change first and last name
          </Link> <br/>
          {/* links to my qna components */}
          <Link to="/my-questions" className="link">
            View the questions you have posted
          </Link> <br/>
          <Link to="/my-answers" className="link">
            View the questions which you have contributed to
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MyProfile;

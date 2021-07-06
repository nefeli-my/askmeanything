import React, {useState} from 'react';
import Modal from 'react-modal';
import {Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/Update.css';
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const UpdatePassword = () => {
  // update password form component
  const [newpw, setNewPw] = useState('');
  const [confpw, setConfPw] =useState('');
  // to make it look like an pop-window use React-Modal
  const [modalIsOpen,setIsOpen] = useState(true);
  const token = localStorage.getItem('askmeanything_token');
  const history = useHistory();

  const modalStyles = {
    content : {
      top                   : '45%',
      left                  : '50%',
      width                 : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      transform             : 'translate(-50%, -50%)',
      padding               : '2%',
      borderRadius          : '10px'
    }
  };

  // close pop-up
  function closeModal(e){
    e.preventDefault(e);
    setIsOpen(false);
    history.push('/profile');
  }

  // update password
  function handleSubmit(e) {
    e.preventDefault(e);
    if (newpw !== confpw) {
      NotificationManager.error('Password confirmation failed, please try again.','Error');
      return;
    }
    fetch(process.env.REACT_APP_AUTH_URL + 'update',
        {
          method: 'PATCH',
          headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)},
          body: JSON.stringify({password: newpw})
        })
        .then(function (res) {
              setIsOpen(false);
              if (res.status === 200) {
                NotificationManager.success('Password successfully reset!','Success!', 2000);
                history.push('/profile');
              // error handling
              } else if (res.status === 401) {
                console.log('401 Unauthorized Error');
                alert('Your session expired. Please login again.');
                localStorage.removeItem('askmeanything_token');
                history.push('/login');
              } else if (res.status === 400) {
                console.log('400 Bad Request');
                NotificationManager.error('Update failed, please try again.','Error', 2000);
                history.push('/profile');
              } else {
                console.log('500 Internal Server Error');
                history.push('/error-500');
              }
            }
        )
        .catch(err => {
            console.log(err);
            history.push('/error-500');
        });
  }

  return (
    <div>
      <Navbar/>
      {/* pop-up window */}
      <Modal
        isOpen={modalIsOpen}
        style={modalStyles}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="content">
          {/* new password submission form */}
          <Form>
            <h3><b> Reset Password: </b></h3>
            <Form.Group>
              <Form.Label className="formLabel">
                New Password:
              </Form.Label>
              <Form.Control
                className="label"
                type="password"
                required
                value={newpw}
                onChange={(e) => setNewPw(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="formLabel">
                Confirm new password:
              </Form.Label>
              <Form.Control
                className="label"
                type="password"
                required
                value={confpw}
                onChange={(e) => setConfPw(e.target.value)}
            />
            </Form.Group>
          </Form>
          {/* submit and close modal buttons */}
          <div className="buttons">
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => handleSubmit(e)}>
                update
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={(e) => closeModal(e)}>
                nevermind
            </button>
          </div>
        </div>
      </Modal>
      <Footer/>
      
    </div>
  );
}

export default UpdatePassword;

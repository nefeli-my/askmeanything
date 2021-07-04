import React, {useState} from 'react';
import Modal from 'react-modal';
import {Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/Update.css';
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const UpdateName = () => {
  // update first and last name form component
  const [newfn, setNewFN] = useState('');   // first name state
  const [newln, setNewLN] =useState('');    // last name state
  // to make it look like an pop-window use React-Modal
  const [modalIsOpen,setIsOpen] = useState(true);
  const token = localStorage.getItem('askmeanything_token');
  const history = useHistory();
  let error =   "Update failed. Please make sure you have inserted only "
              + "one word as first and last name accordingly, and have used "
              + "only alphabetic characters. No spaces are allowed.";

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
    e.preventDefault();
    setIsOpen(false);
    history.push('/profile');
  }

  // update name
  function handleSubmit(e) {
    e.preventDefault();
    fetch(process.env.AUTH_URL + 'update',
        {
          method: 'PATCH',
          headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)},
          body: JSON.stringify({firstName: newfn, lastName: newln})
        })
        .then(function (res) {
              setIsOpen(false);
              if (res.status === 200) {
                  NotificationManager.success('Account information successfully updated!','Success!', 2000);
                  history.push('/profile');
              // error handling
              } else if (res.status === 401) {
                console.log('401 Unauthorized Error');
                localStorage.removeItem('askmeanything_token');
                alert('Your session expired. Please login again.');
                history.push('/login');
              } else if (res.status === 400) {
                console.log('400 Bad Request');
                NotificationManager.error(error, "Error", 5000);
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
          {/* new full name submission form */}
          <Form>
            <h3><b> Reset your full name: </b></h3>
            <Form.Group>
              <Form.Label className="formLabel">
                First Name:
              </Form.Label>
              <Form.Control
                className="label"
                required
                value={newfn}
                onChange={(e) => setNewFN(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="formLabel">
                Last Name:
              </Form.Label>
              <Form.Control
                className="label"
                required
                value={newln}
                onChange={(e) => setNewLN(e.target.value)}
            />
            </Form.Group>
          </Form>
          {/* submit and close modal buttons */}
          <div className="buttons">
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => handleSubmit(e)}
              disabled={!newfn || !newln}>
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

export default UpdateName;

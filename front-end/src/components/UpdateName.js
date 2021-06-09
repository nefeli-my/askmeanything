import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import {Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Navbar from './Navbar';
import '../css/Update.css';

const UpdateName = () => {
  // update first and last name form component
  const [newfn, setNewFN] = useState('');   // first name state
  const [newln, setNewLN] =useState('');    // last name state
  // to make it look like an pop-window use React-Modal
  const [modalIsOpen,setIsOpen] = useState(true);
  const token = localStorage.getItem('REACT_TOKEN_AUTH');
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
  function closeModal(){
    setIsOpen(false);
    history.push('/profile');
  }

  // update password
  function handleSubmit() {
    fetch('http://localhost:8001/update',
        {
          method: 'PATCH',
          headers: {"Content-Type": "application/json", "Authorization": 'Bearer ' + JSON.parse(token)},
          body: JSON.stringify({firstName: newfn, lastName: newln})
        })
        .then(function (res) {
              setIsOpen(false);
              if (res.status === 200) {
                alert('Account information successfully updated!');
                history.push('/profile');
              // error handling
              } else if (res.status === 401) {
                console.log('401 Unauthorized Error');
                alert('Your session expired. Please login again.');
                history.push('/login');
              } else if (res.status === 400) {
                console.log('400 Bad Request');
              } else {
                console.log('500 Internal Server Error');
                history.push('/error-500');
              }
            }
        );
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
        <div class="content">
          {/* new password submission form */}
          <Form>
            <h3><b> Reset your name: </b></h3>
            <Form.Group>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                className="label"
                required
                value={newfn}
                onChange={(e) => setNewFN(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                className="label"
                required
                value={newln}
                onChange={(e) => setNewLN(e.target.value)}
            />
            </Form.Group>
          </Form>
          {/* submit and close modal buttons */}
          <div class="buttons">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmit}>
                update
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={closeModal}>
                nevermind
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UpdateName;

import React, {useState} from 'react';
import { send } from 'emailjs-com';
import {Button, Form} from "react-bootstrap";
import '../css/ContactForm.css';
import contact_us from '../assets/contact-us.png'
import {useHistory} from "react-router-dom";
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ContactForm = () => {
    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: '',
        message: '',
        reply_to: '',
    });
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        send(
            'askmeanything',
            'contactus',
            toSend,
            'user_6RYYMLMUvxyILBTlAHQxV'
        )
            .then((response) => {
                NotificationManager.success('Your message was sent successfully!','Success!', 2000);
                history.push('/contactus');

            })
            .catch((err) => {
                NotificationManager.error('Your message was not sent!Please try again later!','Error!', 2000);
            });
    };
    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
        <div className="contact">
        <div className='contact-form'>
            <form onSubmit={onSubmit}>
                <img src={contact_us} alt="contact person"/>
                <h3><b> Contact us! </b></h3>
                <Form.Group>
                    <Form.Label className="label">Your name:</Form.Label>
                    <Form.Control
                        name='from_name'
                        required
                        value={toSend.from_name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="label">Your e-mail:</Form.Label>
                    <Form.Control
                        type='email'
                        required
                        name='reply_to'
                        placeholder="name@example.com"
                        value={toSend.reply_to}
                        onChange={handleChange}                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="label">Your message:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        required
                        name='message'
                        value={toSend.message}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button
                    className="btn-1"
                    block variant="outline-primary"
                    type="submit"
                >
                    Send message!
                </Button>
            </form>
        </div>
        
        </div>
    );
}

export default  ContactForm;

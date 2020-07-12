import React, { useState } from 'react';
import axios from 'axios';
import { useStore } from '../../store';

const Feedback = () => {
    const { dispatch } = useStore();
    const [show, setShow] = useState(false);
    const [feedbackForm, setFeedbackForm] = useState({ email: '', msg: '' });
    const [formErrors, setFormErrors] = useState({ email: '', msg: '' });

    const onChange = e => setFeedbackForm({ ...feedbackForm, [e.target.name]: e.target.value });

    const handleSendClick = async () => {
        if (feedbackForm.email === '' || feedbackForm.msg === '') {
            setFormErrors({
                email: !feedbackForm.email ? 'Please add a valid email' : '',
                msg: !feedbackForm.msg ? 'Please add a msg' : '',
            })
        } else {
            const options = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            try {
                const res = await axios.post('/api/user/feedback', feedbackForm, options);
                // console.log(res);
                if (res.status === 200) {
                    dispatch({ type: 'setAlert', payload: 'Feedback sent!' })
                    setFeedbackForm({
                        email: '',
                        msg: ''
                    });
                    setShow(false);
                    setFormErrors({ email: '', msg: '' });
                } else {
                    setFormErrors('Email already exists')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleCloseClick = () => {
        setShow(false);
        setFormErrors({ email: '', msg: '' });
    }

    return (
        <div className="feedback-container">
            {show && <div className="feedback-form">
                <h4 className="center-text">Have Feedback?</h4>
                <p className="center-text mt-05">Find any bugs or thoughts on ways to improve? Let us know!</p>
                {formErrors.email && <p className="center-text alert">{formErrors.email}</p>}
                {formErrors.msg && <p className="center-text alert">{formErrors.msg}</p>}
                <input
                    name='email'
                    value={feedbackForm.email}
                    onChange={onChange}
                    className="feedback-email mt-05"
                    placeholder="Email" />
                <textarea
                    name='msg'
                    value={feedbackForm.msg}
                    onChange={onChange}
                    className="feedback-msg mt-05"
                    placeholder="Your message"></textarea>
                <div className="center-div">
                    <button
                        className="btn mr-05 mt-05 mb-05"
                        onClick={handleCloseClick}>Close</button>
                    <button
                        className="btn ml-05 mt-05 mb-05"
                        onClick={handleSendClick}>Send</button>
                </div>
            </div>}
            {!show && <button className="fixed-btn" onClick={() => setShow(true)}>Feedback</button>}
        </div>
    )
}

export default Feedback

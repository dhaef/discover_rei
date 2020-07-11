import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
    const [show, setShow] = useState(false);
    const [feedbackForm, setFeedbackForm] = useState({ email: '', msg: '' });

    const onChange = e => setFeedbackForm({ ...feedbackForm, [e.target.name]: e.target.value });

    const handleSendClick = async () => {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/user/feedback', feedbackForm, options);
            console.log(res);
            if (res.status === 200) {
                setFeedbackForm({
                    email: '',
                    msg: ''
                });
                setShow(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="feedback-container">
            {show && <div className="feedback-form">
                <h4 className="center-text">Have Feedback?</h4>
                <p className="center-text mt-05">Find any bugs or thoughts on ways to improve? Let us know!</p>
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
                        onClick={() => setShow(false)}>Close</button>
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

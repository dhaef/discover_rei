import React, { useState } from 'react';
import axios from 'axios';
import { useStore } from '../../store/index';

const EmailList = () => {
    const { state, dispatch } = useStore();
    const { addToEmailList } = state;
    const [email, setEmail] = useState('');
    const [formError, setFormError] = useState('');

    const handleEmailClick = async () => {
        if (email === '') {
            setFormError('Please add a valid email');
        } else {
            const options = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            try {
                const res = await axios.post('/api/user/email-list', { email }, options);
                // console.log(res);
                if (res.status === 200) {
                    dispatch({ type: 'setAlert', payload: 'Email added!' });
                    setTimeout(() => dispatch({ type: 'closeAlert' }), 3000);
                    setEmail('');
                    dispatch({ type: 'hideAddToEmailList' });
                    setFormError('');
                }
            } catch (error) {
                console.log(error.response.data);
                setFormError(error.response.data.type);
            }
        }
    }

    const handleCloseClick = () => {
        dispatch({ type: 'hideAddToEmailList' });
        setFormError('');
    }

    return (
        <>
            {addToEmailList && <div className="email-list-container">
                <div style={{ width: 'fit-content', margin: 'auto' }}>
                    <p className="email-list-text center-text mt-05">We're brand new and changing fast! Want to be notified when we lauch a new update? Add your email</p>
                    {formError && <p className="alert center-text">{formError}</p>}
                    <input
                        value={email}
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        className="email-list-email"
                        placeholder="Your Email..." />
                    <div className="center-div">
                        <button className="btn mr-05 mt-05 mb-05" onClick={handleEmailClick}>Add Email</button>
                        <button className="btn mr-05 mt-05 mb-05" onClick={handleCloseClick}>Close</button>
                    </div>
                </div>
            </div>}
            {!addToEmailList && <div className="email-list-btn-container">
                <button className="fixed-btn" onClick={() => dispatch({ type: 'showAddToEmailList' })}>Join</button>
            </div>}
        </>
    )
}

export default EmailList

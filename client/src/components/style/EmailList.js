import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../../store/index';

const EmailList = () => {
    const { state, dispatch } = useStore();
    const { addToEmailList } = state;
    const [email, setEmail] = useState('');

    useEffect(() => {
        // window.localStorage.getItem('email-list')
        //     ? setShow(false)
        //     : window.localStorage.setItem('email-list', 'true')
    });

    const handleEmailClick = async () => {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/user/email-list', { email }, options);
            console.log(res);
            if (res.status === 200) {
                setEmail('');
                dispatch({ type: 'hideAddToEmailList' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {addToEmailList && <div className="email-list-container">
                <div style={{ width: 'fit-content', margin: 'auto' }}>
                    <p className="email-list-text center-text mt-05">We're brand new and changing fast! Want to be notified when we lauch a new update? Add your email</p>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="email-list-email"
                        placeholder="Your Email..." />
                    <div className="center-div">
                        <button className="btn mr-05 mt-05 mb-05" onClick={handleEmailClick}>Add Email</button>
                        <button className="btn mr-05 mt-05 mb-05" onClick={() => dispatch({ type: 'hideAddToEmailList' })}>Close</button>
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

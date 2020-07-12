import React from 'react';
import { useStore } from '../../store/index';

const PopupAlert = () => {
    const { state, dispatch } = useStore();
    return (
        <div className={`${state.alert.show ? 'show' : 'hide'} popup-alert`}>
            <p className="popup-text">{state.alert.text} <span
                className="ml-05 remove-filter"
                onClick={() => dispatch({ type: 'closeAlert' })}>X</span></p>
        </div>
    )
}

export default PopupAlert

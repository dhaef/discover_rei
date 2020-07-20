import React from 'react';
import PropTypes from 'prop-types';

const MethodItem = ({ title, description, qualifers }) => {
    return (
        <div className="method-item">
            <h3 className="center-text">{title}</h3>
            <p className="center-text">{description}</p>
            <p className="center-text"><strong>Great</strong> = {qualifers.great}</p>
            <p className="center-text"><strong>Good</strong> = {qualifers.good}</p>
            <p className="center-text"><strong>Fair</strong> = {qualifers.fair}</p>
            <p className="center-text"><strong>Poor</strong> = {qualifers.poor}</p>
        </div>
    )
}

MethodItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    qualifers: PropTypes.object.isRequired,
}

export default MethodItem

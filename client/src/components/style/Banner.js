import React from 'react';
import PropTypes from 'prop-types';

const Banner = ({ name }) => {
    return (
        <div className="header">
            <h2 className="center center-text banner-title">{name}</h2>
        </div>
    )
}

Banner.propTypes = {
    name: PropTypes.string.isRequired,
}

export default Banner

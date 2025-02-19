import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from '../../store';

const Banner = ({ name }) => {
    const { dispatch } = useStore();
    return (
        <div className="header">
            {name !== 'XplorePlaces' && <h2 className="center center-text banner-title">{name}</h2>}
            {name === 'XplorePlaces' && <div className="home-header">
                <h2 className="home-header-title home-header-item mr-auto ml-auto mb-05 mt-05">{name}</h2>
                <p className="home-header-text center-text home-header-item">Explore🕵️ the best📈 places to live🏡 or invest🏘 in the United States🇺🇸</p>
                <button className="home-header-btn btn center-btn" onClick={() => dispatch({ type: 'showAddToEmailList' })}>Join Today!</button>
            </div>}
        </div>
    )
}

Banner.propTypes = {
    name: PropTypes.string.isRequired,
}

export default Banner

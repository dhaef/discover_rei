import React from 'react';
import PropTypes from 'prop-types';

const Score = ({ places }) => {

    const setOverallScore = () => {
        let totalClassFill;
        const totalQualifyingVals = Object.keys(places).filter(key => key.endsWith('score')).length;
        if (places.total >= ((totalQualifyingVals - 1) * 4) && places.total <= (totalQualifyingVals * 4)) {
            totalClassFill = 'bar-great';
        } else if (places.total >= ((totalQualifyingVals - 2) * 4) && places.total < ((totalQualifyingVals - 1) * 4)) {
            totalClassFill = 'bar-good';
        } else if (places.total >= ((totalQualifyingVals - 3) * 4) && places.total < ((totalQualifyingVals - 2) * 4)) {
            totalClassFill = 'bar-fair';
        } else if (places.total < ((totalQualifyingVals - 3) * 4)) {
            totalClassFill = 'bar-poor';
        }
        return <div className="bar-item score-item">
            <span className="bar-name">Overall</span>
            <div className="bar">
                <div className={`bar-fill ${totalClassFill}`}>
                    <span className="bar-fill-text">{`${places.total}/${totalQualifyingVals * 4}`}</span>
                </div>
            </div>
        </div>
    };

    return (
        <>
            <h2 className="center-text mt-1 mb-05">Overall Rating</h2>
            <div className="score-container">
                {setOverallScore()}
                <div className="bar-item score-item">
                    <span className="bar-name">Pop.</span>
                    <div className="bar">
                        <div className={`bar-fill ${places.pop_score === 4 ? 'bar-great' : places.pop_score === 3 ? 'bar-good' : places.pop_score === 2 ? 'bar-fair' : places.pop_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                            <span className="bar-fill-text">{places.pop_score === 4 ? 'Great' : places.pop_score === 3 ? 'Good' : places.pop_score === 2 ? 'Fair' : places.pop_score === 1 ? 'Poor' : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div className="bar-item score-item">
                    <span className="bar-name">Pop Grow.</span>
                    <div className="bar">
                        <div className={`bar-fill ${places.pop_grow_score === 4 ? 'bar-great' : places.pop_grow_score === 3 ? 'bar-good' : places.pop_grow_score === 2 ? 'bar-fair' : places.pop_grow_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                            <span className="bar-fill-text">{places.pop_grow_score === 4 ? 'Great' : places.pop_grow_score === 3 ? 'Good' : places.pop_grow_score === 2 ? 'Fair' : places.pop_grow_score === 1 ? 'Poor' : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div className="bar-item score-item">
                    <span className="bar-name">GDP Grow.</span>
                    <div className="bar">
                        <div className={`bar-fill ${places.grp_grow_score === 4 ? 'bar-great' : places.grp_grow_score === 3 ? 'bar-good' : places.grp_grow_score === 2 ? 'bar-fair' : places.grp_grow_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                            <span className="bar-fill-text">{places.grp_grow_score === 4 ? 'Great' : places.grp_grow_score === 3 ? 'Good' : places.grp_grow_score === 2 ? 'Fair' : places.grp_grow_score === 1 ? 'Poor' : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div className="bar-item score-item">
                    <span className="bar-name">GDP Div.</span>
                    <div className="bar">
                        <div className={`bar-fill ${places.grp_score === 4 ? 'bar-great' : places.grp_score === 3 ? 'bar-good' : places.grp_score === 2 ? 'bar-fair' : places.grp_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                            <span className="bar-fill-text">{places.grp_score === 4 ? 'Great' : places.grp_score === 3 ? 'Good' : places.grp_score === 2 ? 'Fair' : places.grp_score === 1 ? 'Poor' : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div className="bar-item score-item">
                    <span className="bar-name">Unemp Rate</span>
                    <div className="bar">
                        <div className={`bar-fill ${places.unemp_score === 4 ? 'bar-great' : places.unemp_score === 3 ? 'bar-good' : places.unemp_score === 2 ? 'bar-fair' : places.unemp_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                            <span className="bar-fill-text">{places.unemp_score === 4 ? 'Great' : places.unemp_score === 3 ? 'Good' : places.unemp_score === 2 ? 'Fair' : places.unemp_score === 1 ? 'Poor' : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div className="bar-item score-item">
                    <span className="bar-name">Job Gro.</span>
                    <div className="bar">
                        <div className={`bar-fill ${places.emp_score === 4 ? 'bar-great' : places.emp_score === 3 ? 'bar-good' : places.emp_score === 2 ? 'bar-fair' : places.emp_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                            <span className="bar-fill-text">{places.emp_score === 4 ? 'Great' : places.emp_score === 3 ? 'Good' : places.emp_score === 2 ? 'Fair' : places.emp_score === 1 ? 'Poor' : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                {places.sw_score && <div className="bar-item score-item">
                    <span className="bar-name">Wea Dmg</span>
                    <div className="bar">
                        <div className={`bar-fill ${places.sw_score === 4 ? 'bar-great' : places.sw_score === 3 ? 'bar-good' : places.sw_score === 2 ? 'bar-fair' : places.sw_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                            <span className="bar-fill-text">{places.sw_score === 4 ? 'Great' : places.sw_score === 3 ? 'Good' : places.sw_score === 2 ? 'Fair' : places.sw_score === 1 ? 'Poor' : 'N/A'}</span>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}

Score.propTypes = {
    places: PropTypes.object.isRequired,
}

export default Score

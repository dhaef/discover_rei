import React from 'react';
import { Link } from 'react-router-dom';

const Scores = ({ places, placeToShow, classToBe }) => {

    const setOverallScore = () => {
        let totalClassFill;
        const totalQualifyingVals = Object.keys(places).filter(key => key.endsWith('score')).length;
        if (places.total >= (totalQualifyingVals * 3) && places.total <= (totalQualifyingVals * 4)) {
            totalClassFill = 'bar-great';
        } else if (places.total >= (totalQualifyingVals * 2) && places.total < (totalQualifyingVals * 3)) {
            totalClassFill = 'bar-good';
        } else if (places.total >= totalQualifyingVals && places.total < (totalQualifyingVals * 2)) {
            totalClassFill = 'bar-fair';
        } else if (places.total < totalQualifyingVals) {
            totalClassFill = 'bar-poor';
        }
        return <div className="bar-item">
            <span className="bar-name">Overall</span>
            <div className="bar">
                <div className={`bar-fill ${totalClassFill}`}>
                    <span className="bar-fill-text">{`${places.total}/${totalQualifyingVals * 4}`}</span>
                    {/* <span className="bar-fill-text">{totalClassText}</span> */}
                </div>
            </div>
        </div>
    };

    return (
        <div className={classToBe}>
            {placeToShow === 'county' && <h5 className="mb-05">
                <Link
                    to={`/county/${places.fips}`}
                    className="link"
                >
                    {places.county_name}
                </Link>
            </h5>}
            {placeToShow === 'metro' && <h5 className="mb-05">
                <Link
                    to={`/metro/${places.cbsa}`}
                    className="link"
                >
                    {places.metro_name}
                </Link>
            </h5>}
            {setOverallScore()}
            <div className="bar-item">
                <span className="bar-name">Pop.</span>
                <div className="bar">
                    <div className={`bar-fill ${places.pop_score === 4 ? 'bar-great' : places.pop_score === 3 ? 'bar-good' : places.pop_score === 2 ? 'bar-fair' : places.pop_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                        <span className="bar-fill-text">{places.pop_score === 4 ? 'Great' : places.pop_score === 3 ? 'Good' : places.pop_score === 2 ? 'Fair' : places.pop_score === 1 ? 'Poor' : 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div className="bar-item">
                <span className="bar-name">Pop Grow.</span>
                <div className="bar">
                    <div className={`bar-fill ${places.pop_grow_score === 4 ? 'bar-great' : places.pop_grow_score === 3 ? 'bar-good' : places.pop_grow_score === 2 ? 'bar-fair' : places.pop_grow_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                        <span className="bar-fill-text">{places.pop_grow_score === 4 ? 'Great' : places.pop_grow_score === 3 ? 'Good' : places.pop_grow_score === 2 ? 'Fair' : places.pop_grow_score === 1 ? 'Poor' : 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div className="bar-item">
                <span className="bar-name">GDP Grow.</span>
                <div className="bar">
                    <div className={`bar-fill ${places.grp_grow_score === 4 ? 'bar-great' : places.grp_grow_score === 3 ? 'bar-good' : places.grp_grow_score === 2 ? 'bar-fair' : places.grp_grow_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                        <span className="bar-fill-text">{places.grp_grow_score === 4 ? 'Great' : places.grp_grow_score === 3 ? 'Good' : places.grp_grow_score === 2 ? 'Fair' : places.grp_grow_score === 1 ? 'Poor' : 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div className="bar-item">
                <span className="bar-name">GDP Div.</span>
                <div className="bar">
                    <div className={`bar-fill ${places.grp_score === 4 ? 'bar-great' : places.grp_score === 3 ? 'bar-good' : places.grp_score === 2 ? 'bar-fair' : places.grp_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                        <span className="bar-fill-text">{places.grp_score === 4 ? 'Great' : places.grp_score === 3 ? 'Good' : places.grp_score === 2 ? 'Fair' : places.grp_score === 1 ? 'Poor' : 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div className="bar-item">
                <span className="bar-name">Job Gro.</span>
                <div className="bar">
                    <div className={`bar-fill ${places.emp_score === 4 ? 'bar-great' : places.emp_score === 3 ? 'bar-good' : places.emp_score === 2 ? 'bar-fair' : places.emp_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                        <span className="bar-fill-text">{places.emp_score === 4 ? 'Great' : places.emp_score === 3 ? 'Good' : places.emp_score === 2 ? 'Fair' : places.emp_score === 1 ? 'Poor' : 'N/A'}</span>
                    </div>
                </div>
            </div>
            {placeToShow === 'county' && <div className="bar-item">
                <span className="bar-name">Wea Dmg</span>
                <div className="bar">
                    <div className={`bar-fill ${places.sw_score === 4 ? 'bar-great' : places.sw_score === 3 ? 'bar-good' : places.sw_score === 2 ? 'bar-fair' : places.sw_score === 1 ? 'bar-poor' : 'bar-empty'}`}>
                        <span className="bar-fill-text">{places.sw_score === 4 ? 'Great' : places.sw_score === 3 ? 'Good' : places.sw_score === 2 ? 'Fair' : places.sw_score === 1 ? 'Poor' : 'N/A'}</span>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Scores

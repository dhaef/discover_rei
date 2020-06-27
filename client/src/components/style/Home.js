import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../../store/index';

const Home = ({ placeToShow }) => {
    const { state, dispatch } = useStore();
    const { loading } = state;
    const isMounted = useRef(true);

    const getData = async () => {
        dispatch({ type: 'setLoading', payload: true });
        const res = placeToShow === 'metro' ? await axios.get('/metro/score') : await axios.get('/county/score');
        if (isMounted.current) {
            dispatch({
                type: 'setScore', payload: {
                    type: placeToShow,
                    data: res.data
                }
            })
        }
    };

    useEffect(() => {
        isMounted.current = true;
        const banner = placeToShow === "metro" ? 'Top Metros' : 'Top Counties';
        dispatch({ type: 'setBanner', payload: banner });
        if (state[`${placeToShow}_score`].length === 0) {
            getData();
        }
        return () => isMounted.current = false;
        // eslint-disable-next-line
    }, [state.county_score, state.metro_score, placeToShow]);

    return (
        <div>
            {/* <Banner name={'Home'} /> */}
            {loading && <div className="loading"></div>}
            <div className="container home-container">
                {!loading && state[`${placeToShow}_score`]
                    .filter(place => {
                        const topVal = Object.keys(place).filter(key => key.endsWith('score')).length * 4;
                        if (place.total > (topVal - 3) && placeToShow === "metro") {
                            return place;
                        } else if (place.total > (topVal - 5) && placeToShow === "county") {
                            return place;
                        } else {
                            return null;
                        }
                    })
                    .sort((a, b) => b.total - a.total)
                    .map(place => {
                        let totalClassFill, totalClassText;
                        const totalQualifyingVals = Object.keys(place).filter(key => key.endsWith('score')).length;
                        if (place.total >= (totalQualifyingVals * 3) && place.total <= (totalQualifyingVals * 4)) {
                            totalClassFill = 'bar-great';
                            totalClassText = 'Great';
                        } else if (place.total >= (totalQualifyingVals * 2) && place.total < (totalQualifyingVals * 3)) {
                            totalClassFill = 'bar-good';
                            totalClassText = 'Good';
                        } else if (place.total >= totalQualifyingVals && place.total < (totalQualifyingVals * 2)) {
                            totalClassFill = 'bar-fair';
                            totalClassText = 'Fair';
                        } else if (place.total < totalQualifyingVals) {
                            totalClassFill = 'bar-poor';
                            totalClassText = 'Poor';
                        }
                        const key = placeToShow === 'metro' ? place.cbsa : place.fips;
                        return <div key={key} className="home-item">
                            {placeToShow === 'county' && <h5 className="mb-05">
                                <Link
                                    to={`county/${place.fips}`}
                                    className="link"
                                    onClick={() => dispatch({ type: 'setCurrentCounty', payload: place })}
                                >
                                    {place.county_name}
                                </Link>
                            </h5>}
                            {placeToShow === 'metro' && <h5 className="mb-05">
                                <Link
                                    // onClick={() => dispatch({ type: 'setLoading' })}
                                    to={`metro/${place.cbsa}`}
                                    className="link"
                                // onClick={() => dispatch({ type: 'setCurrentMetro', payload: place })}
                                >
                                    {place.metro_name}
                                </Link>
                            </h5>}
                            <div className="bar-item">
                                <span className="bar-name">Overall{place.total}</span>
                                <div className="bar">
                                    <div className={`bar-fill ${totalClassFill}`}>
                                        <span className="bar-fill-text">{totalClassText}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bar-item">
                                <span className="bar-name">Pop.</span>
                                <div className="bar">
                                    <div className={`bar-fill ${place.pop_score === 4 ? 'bar-great' : place.pop_score === 3 ? 'bar-good' : place.pop_score === 2 ? 'bar-fair' : 'bar-poor'}`}>
                                        <span className="bar-fill-text">{place.pop_score === 4 ? 'Great' : place.pop_score === 3 ? 'Good' : place.pop_score === 2 ? 'Fair' : 'Poor'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bar-item">
                                <span className="bar-name">Pop Grow.</span>
                                <div className="bar">
                                    <div className={`bar-fill ${place.pop_grow_score === 4 ? 'bar-great' : place.pop_grow_score === 3 ? 'bar-good' : place.pop_grow_score === 2 ? 'bar-fair' : 'bar-poor'}`}>
                                        <span className="bar-fill-text">{place.pop_grow_score === 4 ? 'Great' : place.pop_grow_score === 3 ? 'Good' : place.pop_grow_score === 2 ? 'Fair' : 'Poor'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bar-item">
                                <span className="bar-name">GDP Grow.</span>
                                <div className="bar">
                                    <div className={`bar-fill ${place.grp_grow_score === 4 ? 'bar-great' : place.grp_grow_score === 3 ? 'bar-good' : place.grp_grow_score === 2 ? 'bar-fair' : 'bar-poor'}`}>
                                        <span className="bar-fill-text">{place.grp_grow_score === 4 ? 'Great' : place.grp_grow_score === 3 ? 'Good' : place.grp_grow_score === 2 ? 'Fair' : 'Poor'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bar-item">
                                <span className="bar-name">GDP Div.</span>
                                <div className="bar">
                                    <div className={`bar-fill ${place.grp_score === 4 ? 'bar-great' : place.grp_score === 3 ? 'bar-good' : place.grp_score === 2 ? 'bar-fair' : 'bar-poor'}`}>
                                        <span className="bar-fill-text">{place.grp_score === 4 ? 'Great' : place.grp_score === 3 ? 'Good' : place.grp_score === 2 ? 'Fair' : 'Poor'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bar-item">
                                <span className="bar-name">Job Gro.</span>
                                <div className="bar">
                                    <div className={`bar-fill ${place.emp_score === 4 ? 'bar-great' : place.emp_score === 3 ? 'bar-good' : place.emp_score === 2 ? 'bar-fair' : 'bar-poor'}`}>
                                        <span className="bar-fill-text">{place.emp_score === 4 ? 'Great' : place.emp_score === 3 ? 'Good' : place.emp_score === 2 ? 'Fair' : 'Poor'}</span>
                                    </div>
                                </div>
                            </div>
                            {placeToShow === "county" && <div className="bar-item">
                                <span className="bar-name">Wea Dmg</span>
                                <div className="bar">
                                    <div className={`bar-fill ${place.sw_score === 4 ? 'bar-great' : place.sw_score === 3 ? 'bar-good' : place.sw_score === 2 ? 'bar-fair' : 'bar-poor'}`}>
                                        <span className="bar-fill-text">{place.sw_score === 4 ? 'Great' : place.sw_score === 3 ? 'Good' : place.sw_score === 2 ? 'Fair' : 'Poor'}</span>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    })}
            </div>
        </div>
    )
}

Home.propTypes = {
    placeToShow: PropTypes.string.isRequired,
}

Home.defaultProps = {
    placeToShow: 'metro'
}

export default Home

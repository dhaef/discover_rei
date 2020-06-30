import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useStore } from '../../store/index';
import Scores from '../score/Scores';
import FilterSet from '../filter/FilterSet';
import { handleFilter } from '../../utils/filter';

const Home = ({ placeToShow }) => {
    const { state, dispatch } = useStore();
    const { loading, filters } = state;
    const isMounted = useRef(true);
    const [limit, setLimit] = useState(1);
    const [filteredArr, setFilteredArr] = useState([]);
    const [displayFilters, setDisplayFilters] = useState('Show Filters');

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

    useEffect(() => {
        const filteredArray = handleFilter(filters, state[`${placeToShow}_score`]);
        setFilteredArr(filteredArray);
    }, [filters]);

    const listOfFilters = [].concat(...Object.values(filters));
    let placesArr;

    if (listOfFilters.length === 0) {
        placesArr = state[`${placeToShow}_score`].map(place => <Scores
            places={place}
            placeToShow={placeToShow}
            key={placeToShow === 'county' ? place.fips : place.cbsa} />)
    } else if (listOfFilters.length > 0) {
        placesArr = filteredArr.map(place => <Scores
            places={place}
            placeToShow={placeToShow}
            key={placeToShow === 'county' ? place.fips : place.cbsa} />)
    };

    return (
        <div>
            {/* <Banner name={'Home'} /> */}
            {loading && <div className="loading"></div>}
            <div className={`filter-container ${displayFilters === 'Hide Filters' ? 'show-flex' : 'hide'}`}>
                <FilterSet name='population' title='Population' />
                <FilterSet name='population_growth' title='Pop. Growth' />
                <FilterSet name='gdp_growth' title='GDP Growth' />
                <FilterSet name='gdp_diversity' title='GDP Diversity' />
                <FilterSet name='job_growth' title='Job Growth' />
                {placeToShow === 'county' && <FilterSet name='weather_dmg' title='Weather Dmg' />}
            </div>
            <div className='current-filters mt-05 mb-05'>
                <button
                    className="btn ml-05"
                    onClick={() => setDisplayFilters(displayFilters === 'Hide Filters' ? 'Show Filters' : 'Hide Filters')}>{displayFilters}</button>
                <button
                    className="btn ml-05"
                    onClick={() => dispatch({ type: 'clearFilters' })}>Clear Filters</button>
                {listOfFilters.length > 0 && listOfFilters.map(item => {
                    const itemParts = item.split('-');
                    const options = ['poor', 'fair', 'good', 'great'];
                    return <div className="current-filters-item" key={item}>
                        <span className='filter-name'>{`${options[+itemParts[1] - 1]} ${itemParts[0]}`}</span>
                        <span
                            className="ml-1 remove-filter"
                            onClick={() => dispatch({ type: 'removeFilter', payload: item })}>x</span>
                    </div>
                })}
            </div>
            {!loading && <div className="container home-container">
                {placesArr
                    // .filter(place => {
                    //     const topVal = Object.keys(place).filter(key => key.endsWith('score')).length * 4;
                    //     if (place.total > (topVal - 3) && placeToShow === "metro") {
                    //         return place;
                    //     } else if (place.total > (topVal - 5) && placeToShow === "county") {
                    //         return place;
                    //     } else {
                    //         return null;
                    //     }
                    // })
                    .sort((a, b) => b.total - a.total)
                    .filter((place, index) => index < (limit * 9))
                    // .map(place => <Scores
                    //     places={place}
                    //     placeToShow={placeToShow}
                    //     key={placeToShow === 'county' ? place.fips : place.cbsa} />)}
                }
                <button
                    className="btn m-1"
                    onClick={() => setLimit(limit + 1)} >Load More...</button>
            </div>}
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

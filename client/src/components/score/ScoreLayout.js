import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useStore } from '../../store/index';
import Scores from '../score/Scores';
import FilterSet from '../filter/FilterSet';
import { handleFilter } from '../../utils/filter';
import States from '../filter/States';

const ScoreLayout = ({ placeToShow, banner }) => {
    const { state, dispatch } = useStore();
    const { loading, filters } = state;
    const isMounted = useRef(true);
    const [limit, setLimit] = useState(1);
    const [filteredArr, setFilteredArr] = useState([]);
    const [displayFilters, setDisplayFilters] = useState('Show Filters');
    const [sortBy, setSortBy] = useState('descending');
    const [sortState, setSortState] = useState('');

    const getData = async () => {
        dispatch({ type: 'setLoading', payload: true });
        const res = placeToShow === 'metro' ? await axios.get('/api/metro/score') : await axios.get('/api/county/score');
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
        const bannerName = placeToShow === "metro" ? 'Top Metros' : 'Top Counties';
        if (banner === 'show') {
            dispatch({ type: 'setBanner', payload: bannerName });
        }
        if (state[`${placeToShow}_score`].length === 0) {
            getData();
        }
        return () => isMounted.current = false;
        // eslint-disable-next-line
    }, [state.county_score, state.metro_score, placeToShow]);

    useEffect(() => {
        if (placeToShow === 'metro' && filters.weather_dmg.length > 0) {
            dispatch({ type: 'removeWeatherFilter' })
        }
        const filteredArray = handleFilter(filters, state[`${placeToShow}_score`]);
        setFilteredArr(filteredArray);
        // eslint-disable-next-line
    }, [filters, placeToShow]);

    const handleClearFilters = () => {
        dispatch({ type: 'clearFilters' });
        setSortState('');
    }

    const listOfFilters = [].concat(...Object.values(filters));
    let placesArr;

    if (listOfFilters.length === 0) {
        placesArr = state[`${placeToShow}_score`].map(place => place)
    } else if (listOfFilters.length > 0) {
        placesArr = filteredArr.map(place => place)
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
                <FilterSet name='unemp_rate' title='Unemp Rate' />
                {placeToShow === 'county' && <FilterSet name='weather_dmg' title='Weather Dmg' />}
            </div>
            <div className='current-filters mt-05 mb-05'>
                <button
                    className="btn mt-05 ml-05"
                    onClick={() => setDisplayFilters(displayFilters === 'Hide Filters' ? 'Show Filters' : 'Hide Filters')}>{displayFilters}</button>
                <button
                    className="btn mt-05 ml-05"
                    onClick={handleClearFilters}>Clear Filters</button>
                <select
                    value={sortBy}
                    className="ml-05 mt-05 select"
                    onChange={e => setSortBy(e.target.value)}>
                    <option disabled>Sort By.</option>
                    <option value="descending">Descending</option>
                    <option value="ascending">Ascending</option>
                </select>
                <select
                    value={sortState}
                    className="ml-05 mt-05 select"
                    onChange={e => setSortState(e.target.value)}>
                    <option value='' disabled>State</option>
                    <States />
                </select>
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
            {!loading && <div className="home-container">
                {placesArr
                    .filter(place => {
                        if (sortState === '') {
                            return place;
                        } else {
                            if (place[`${placeToShow}_name`].includes(sortState)) {
                                return place
                            }
                        }
                    })
                    .sort((a, b) => {
                        if (sortBy === 'descending') {
                            return b.total - a.total;
                        } else if (sortBy === 'ascending') {
                            return a.total - b.total;
                        }
                    })
                    .filter((place, index) => index < (limit * 9))
                    .map(place => <Scores
                        places={place}
                        placeToShow={placeToShow}
                        classToBe={'home-item'}
                        key={placeToShow === 'county' ? place.fips : place.cbsa} />)}
            </div>}
            <button
                className="btn home-btn"
                onClick={() => setLimit(limit + 1)} >Load More...</button>
        </div>
    )
}

ScoreLayout.propTypes = {
    placeToShow: PropTypes.string.isRequired,
}

ScoreLayout.defaultProps = {
    placeToShow: 'metro'
}

export default ScoreLayout

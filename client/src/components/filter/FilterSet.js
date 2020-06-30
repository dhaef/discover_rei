import React from 'react';
import { useStore } from '../../store/index';

const FilterSet = ({ name, title }) => {
    const { state, dispatch } = useStore();
    const { filters } = state;
    return (
        <div className="filter-option">
            <span className='filter-title mr-1 ml-1'>{title}:</span>
            <div className="filter-section mt-1">
                <button
                    className={`filter-btn ${filters[name].includes(`${name}-4`) && 'selected'}`}
                    onClick={() => dispatch({ type: 'setFilter', payload: `${name}-4` })}>Great</button>
                <button
                    className={`filter-btn ${filters[name].includes(`${name}-3`) && 'selected'}`}
                    onClick={() => dispatch({ type: 'setFilter', payload: `${name}-3` })}>Good</button>
                <button
                    className={`filter-btn ${filters[name].includes(`${name}-2`) && 'selected'}`}
                    onClick={() => dispatch({ type: 'setFilter', payload: `${name}-2` })}>Fair</button>
                <button
                    className={`filter-btn ${filters[name].includes(`${name}-1`) && 'selected'}`}
                    onClick={() => dispatch({ type: 'setFilter', payload: `${name}-1` })}>Poor</button>
            </div>
        </div>
    )
}

export default FilterSet

import React, { useEffect } from 'react';
import { useStore } from '../../store/index';
import MethodItem from './MethodItem';

const Methodology = () => {
    const { dispatch } = useStore();

    useEffect(() => {
        dispatch({ type: 'setBanner', payload: 'Methodology' })
    }, []);

    return (
        <div className="container method-container">
            <MethodItem
                title="Population"
                description="Ranked by level of population currently in metro or county"
                qualifers={{ great: '1 million+', good: '500k-1 million', fair: '250k-500k', poor: 'less than 250k' }}
            />
            <MethodItem
                title="Population Growth"
                description="Ranked by the size of the 10 year growth rate of the population in the metro or county"
                qualifers={{ great: '2%+', good: '1%-2%', fair: '0-1%', poor: 'less than 0' }}
            />
            <MethodItem
                title="Employment Growth"
                description="Ranked by the size of the 10 year growth rate of the employment rate in the metro or county"
                qualifers={{ great: '2%+', good: '1%-2%', fair: '0-1%', poor: 'less than 0' }}
            />
            <MethodItem
                title="Unemployment Rate"
                description="Ranked by the weighted average unemployment rate for the last 10 years in the metro or county"
                qualifers={{ great: 'less than 4.5%', good: '4.5%-5.5%', fair: '5.5%-6.5%', poor: '6.5%+' }}
            />
            <MethodItem
                title="GDP Growth"
                description="Ranked by the size of the 10 year growth rate of the metro or county GDP"
                qualifers={{ great: '5%+', good: '3%-5%', fair: '1%-3%', poor: 'less than 1%' }}
            />
            <MethodItem
                title="GDP Diversity"
                description="Ranked by the portion of the top three industries make up of the total metro or county GDP"
                qualifers={{ great: 'less than 45%', good: '45%-55%', fair: '55%-65%', poor: '65%+' }}
            />
            <MethodItem
                title="Severe Weather Property Damage"
                description="Ranked by the amount of property damage caused by severe weather in the last 5 years of each county"
                qualifers={{ great: '$0', good: '$0-$1 million', fair: '$i million-$10 million', poor: '$10 million+' }}
            />
        </div>
    )
}

export default Methodology

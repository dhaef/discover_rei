import React, { useEffect } from 'react';
import ScoreLayout from '../score/ScoreLayout';
import { useStore } from '../../store/index';


const Home = () => {
    const { dispatch } = useStore();

    useEffect(() => {
        dispatch({ type: 'setBanner', payload: 'ExplorPlaces' });
    }, []);

    return (
        <div>
            <ScoreLayout placeToShow='metro' banner="hide" />
        </div>
    )
}

export default Home

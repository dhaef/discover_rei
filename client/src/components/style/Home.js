import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from '../../store/index';
import Map from '../../components/map/Map'
import Scores from '../score/Scores'


const Home = () => {
    const { dispatch } = useStore();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [map, setMap] = useState('counties');

    const getData = async () => {
        setLoading(true)
        const res = map === 'metros' ? await axios.get('/api/metro/score') : await axios.get('/api/county/score');
        setData(res.data);
        setLoading(false);
    }

    useEffect(() => {
        dispatch({ type: 'setBanner', payload: 'XplorePlaces' });
        getData()
    }, [map]);

    const handleChangeMapClick = place => {
        setData([]);
        setMap(place)
    }

    return (
        <div>
            <h1 className="mt-1 center-text"><span style={{ textTransform: 'capitalize' }}>{map}</span> Map</h1>
            <div className="mt-1 center-div">
                <button
                    className={`btn mr-05 ${map === 'metros' && 'selected'}`}
                    onClick={() => handleChangeMapClick('metros')}
                >Metros</button>
                <button
                    className={`btn ${map === 'counties' && 'selected'}`}
                    onClick={() => handleChangeMapClick('counties')}
                >Counties</button>
            </div>
            <div className="center-div legend mt-05">
                <h4 className="legend-item">Low Rank</h4>
                <div className="legend-color-item legend-lowest"></div>
                <div className="legend-color-item legend-low"></div>
                <div className="legend-color-item legend-high"></div>
                <div className="legend-color-item legend-highest"></div>
                <h4 className="legend-item">High Rank</h4>
            </div>
            <p className="center-text"><em>*Click the map to see more details on each place!</em></p>
            {!loading
                ? map === 'metros' ? <Map dataScore={data} place='metros' /> : <Map dataScore={data} place='counties' />
                : <div style={{ height: '500px' }}><div className="flex-loading mt-1"></div></div>}
            {!loading && <h1 className="center-text mb-1 mt-1">Check Out the Top <span style={{ textTransform: 'capitalize' }}>{map}</span></h1>}
            <div className="home-container">
                {data
                    .sort((a, b) => b.total - a.total)
                    .map((item, index) => {
                        if (index < 3) {
                            return <Scores
                                places={item}
                                placeToShow={map === 'metros' ? 'metro' : 'county'}
                                classToBe={'home-item'}
                                key={map === 'counties' ? item.fips : item.cbsa} />
                        }
                    })}
            </div>
        </div>
    )
}

export default Home

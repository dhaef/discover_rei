import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../../store/index';
import Score from '../score/Score';
import Scores from '../score/Scores';
import Chart from '../chart/Chart';
import TempChart from '../chart/TempChart';
import PieChart from '../chart/PieChart';

const Metro = () => {
    const { state, dispatch } = useStore();
    const {
        currentCounties,
        currentMetro,
        metros } = state;
    const isMounted = useRef(true);
    const [loading, setLoading] = useState(true);
    const [emptyData, setEmptyData] = useState([]);
    let { cbsa } = useParams();

    useEffect(() => {
        let mounted = true;
        currentMetro.metro_name && dispatch({ type: 'setBanner', payload: currentMetro.metro_name });

        const getData = async () => {
            try {
                const res = await axios.get(`/api/counties/${cbsa}`);
                const resScore = await axios.get(`/api/metro/score/${cbsa}`);
                const resGrp = await axios.get(`/api/metro/grp/${cbsa}`);
                const resGrpTotal = await axios.get(`/api/metro/grp_total/${cbsa}`);
                const resPop = await axios.get(`/api/metro/population/${cbsa}`);
                const resPie = await axios.get(`/api/metro/pie/${cbsa}`);
                const resUnemp = await axios.get(`/api/metro/unemployment/${cbsa}`);
                const resTemp = await axios.get(`/api/metro/temperature/${cbsa}`);
                console.log(resScore.data)
                if (mounted) {
                    dispatch({
                        type: 'setCurrentMetro', payload: {
                            score: resScore.data,
                            grp: resGrp.data,
                            grp_total: resGrpTotal.data,
                            income: resPie.data,
                            pop: resPop.data,
                            temp: resTemp.data,
                            unemp: resUnemp.data,
                            currentCounties: res.data
                        }
                    });
                    setLoading(false);
                }
            } catch (error) {
                throw error;
            }
        };

        getData();

        const setDataIfNotNull = () => {
            const errors = [];
            currentMetro.pop.total.length === 0 && errors.push('Population Data');
            currentMetro.income.total.length === 0 && errors.push('Income Data');
            currentMetro.unemployment.total.length === 0 && errors.push('Unemployment Data');
            currentMetro.employment.total.length === 0 && errors.push('Employment Data');
            currentMetro.grp_total.total.length === 0 && errors.push('GDP Data');
            currentMetro.temperature.length === 0 && errors.push('Temperature Data');
            setEmptyData(errors);
        }

        !loading && setDataIfNotNull();

        return () => {
            isMounted.current = false;
            mounted = false;
        }
        // eslint-disable-next-line
    }, [metros, currentMetro]);

    return (
        <>
            {loading && <div className="loading"></div>}
            {!loading && <div className='container'>
                <div className="container main-content">
                    {<Score places={currentMetro} />}
                    {currentMetro.pop.total.length > 0 && <Chart data={currentMetro.pop} income={false} title='Metro Population' year='10' />}
                    {currentMetro.income.total.length > 0 && <Chart data={currentMetro.income} income={true} title='Metro Income' year='2018' />}
                    {currentMetro.grp_total.total.length > 0 && <Chart data={currentMetro.grp_total} income={true} title='Metro GDP' year='2018' />}
                    {currentMetro.unemployment.total.length > 0 && <Chart data={currentMetro.unemployment} income={false} title='Metro Unemployment' year='11' />}
                    {currentMetro.employment.total.length > 0 && <Chart data={currentMetro.employment} income={false} title='Metro Employment' year='11' />}
                    {currentMetro.temperature.length > 0 && <TempChart data={currentMetro.temperature} />}
                    {currentMetro.temperature.length > 0 && <div className="temp-chart-legend">
                        <div className="temp-chart-legend-item temp-cold"></div>
                        <span className="temp-chart-legend-text ml-05">Colder than average</span>
                        <div className="temp-chart-legend-item temp-hot ml-05"></div>
                        <span className="temp-chart-legend-text ml-05">Hotter than average</span>
                    </div>}
                    {currentMetro.grp.data.length > 0 && <PieChart data={currentMetro.grp.data} labels={currentMetro.grp.labels} />}
                    {currentCounties && <h2 className="center-text">Counties In {currentMetro.metro_name}</h2>}
                    <div className="county-list-container mt-1">
                        {currentCounties && currentCounties.map(county => {
                            return <Scores
                                places={county}
                                placeToShow={'county'}
                                classToBe={'home-item'}
                                key={county.fips} />
                        })}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Metro

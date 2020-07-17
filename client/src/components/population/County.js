import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Score from '../score/Score';
import Scores from '../score/Scores';
import Chart from '../chart/Chart';
import TempChart from '../chart/TempChart';
import BarChart from '../chart/BarChart';
import PieChart from '../chart/PieChart';

const County = () => {
    const { state, dispatch } = useStore();
    const {
        currentCounty,
        countyMetro
    } = state;
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);
    const [emptyData, setEmptyData] = useState([]);

    useEffect(() => {
        let mounted = true;
        currentCounty.county_name && dispatch({ type: 'setBanner', payload: currentCounty.county_name });

        const getData = async () => {
            try {
                const res = await axios.get(`/api/county/score/${id}`);
                const resPop = await axios.get(`/api/county/population/${id}`);
                const resIncome = await axios.get(`/api/county/income/${id}`);
                const resGrp = await axios.get(`/api/county/grp/${id}`);
                const resGrpTotal = await axios.get(`/api/county/grp_total/${id}`);
                const resUnemploy = await axios.get(`/api/county/unemployment/${id}`);
                const resEmploy = await axios.get(`/api/county/employment/${id}`);
                const resSWeath = await axios.get(`/api/county/severe_weather/${id}`);
                const resTemp = await axios.get(`/api/county/temperature/${id}`);
                const resMetro = await axios.get(`/api/metro/score/${res.data[0].cbsa}`);
                console.log(resTemp);
                if (mounted) {
                    dispatch({
                        type: 'setCountyData',
                        payload: {
                            score: res.data,
                            pop: resPop.data,
                            income: resIncome.data,
                            grp: resGrp.data,
                            grp_total: resGrpTotal.data,
                            employment: resEmploy.data,
                            severe_weather: resSWeath.data,
                            countyMetro: resMetro.data,
                            temperature: resTemp.data,
                            unemp: resUnemploy.data
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
            currentCounty.pop.total.length === 0 && errors.push('Population Data');
            currentCounty.income.total.length === 0 && errors.push('Income Data');
            currentCounty.unemployment.total.length === 0 && errors.push('Unemployment Data');
            currentCounty.employment.total.length === 0 && errors.push('Employment Data');
            currentCounty.grp_total.total.length === 0 && errors.push('GDP Data');
            currentCounty.temperature.length === 0 && errors.push('Temperature Data');
            currentCounty.severe_weather_total.length === 0 && errors.push('Severe Weather Data');
            setEmptyData(errors);
        }

        !loading && setDataIfNotNull()

        return () => {
            isMounted.current = false;
            mounted = false;
        }
        // eslint-disable-next-line
    }, [currentCounty]);

    return (
        <>
            {loading && <div className="loading"></div>}
            {!loading && <div>
                <div className="container">
                    {<Score places={currentCounty} />}
                    {currentCounty.pop.total.length > 0 && <Chart data={currentCounty.pop} income={false} title='County Population' year='10' />}
                    {currentCounty.income.total.length > 0 && <Chart data={currentCounty.income} income={true} title='County Income' year='2018' />}
                    {currentCounty.grp_total.total.length > 0 && <Chart data={currentCounty.grp_total} income={true} title='County GDP' year='2018' />}
                    {currentCounty.unemployment.total.length > 0 && <Chart data={currentCounty.unemployment} income={false} title='County Unemployment' year='10' />}
                    {currentCounty.employment.total.length > 0 && <Chart data={currentCounty.employment} income={false} title='County Employment' year='10' />}
                    {currentCounty.temperature.length > 0 && <TempChart data={currentCounty.temperature} />}
                    {currentCounty.temperature.length > 0 && <div className="temp-chart-legend">
                        <div className="temp-chart-legend-item temp-cold"></div>
                        <span className="temp-chart-legend-text ml-05">Colder than average</span>
                        <div className="temp-chart-legend-item temp-hot ml-05"></div>
                        <span className="temp-chart-legend-text ml-05">Hotter than average</span>
                    </div>}
                    {currentCounty.severe_weather_total.length > 0 && <BarChart data={currentCounty.severe_weather_total} />}
                    {currentCounty.grp.data.length > 0 && <PieChart data={currentCounty.grp.data} labels={currentCounty.grp.labels} />}
                    {countyMetro && <> <h3 className="center-text mt-05">County Metro</h3>
                        <Scores
                            places={countyMetro}
                            placeToShow={'metro'}
                            classToBe={'county-item'} /> </>}
                    {emptyData.length > 0 && <div>
                        <h5 className="center-text mt-05">The following data was unavailable</h5>
                        <div style={{ width: 'fit-content' }} className="center mb-05">
                            {emptyData.map((item, index) => {
                                const text = index !== (emptyData.length - 1) ? `${item}, ` : item;
                                return <span key={index}>{text}</span>
                            })}
                        </div>
                    </div>}
                </div>
            </div>}
        </>
    )
}

export default County

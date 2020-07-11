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
    const { currentCounty,
        countyMetro
    } = state;
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);
    const [emptyData, setEmptyData] = useState([]);
    const [chartData, setChartData] = useState({
        total: [],
        growth: []
    });
    const [chartIncData, setChartIncData] = useState({
        total: [],
        growth: []
    });
    const [chartGdpData, setChartGdpData] = useState({
        total: [],
        growth: []
    });
    const [chartEmpData, setChartEmpData] = useState({
        total: [],
        growth: []
    });
    const [pieChartData, setPieChartData] = useState({
        labels: [],
        data: []
    });
    const [chartTempData, setChartTempData] = useState([]);
    const [chartSwData, setChartSwData] = useState([]);

    useEffect(() => {
        let mounted = true;
        currentCounty.county_name && dispatch({ type: 'setBanner', payload: currentCounty.county_name });

        const getData = async () => {
            try {
                const res = await axios.get(`/api/county/score/${id}`);
                const resPop = await axios.get(`/api/county/population/${id}`);
                const resIncome = await axios.get(`/api/county/income/${id}`);
                const resGrp = await axios.get(`/api/county/grp/${id}`);
                const resEmploy = await axios.get(`/api/county/employment/${id}`);
                const resSWeath = await axios.get(`/api/county/severe_weather/${id}`);
                const resTemp = await axios.get(`/api/county/temperature/${id}`);
                const resMetro = await axios.get(`/api/metro/score/${res.data[0].cbsa}`);
                if (mounted) {
                    dispatch({
                        type: 'setCountyData',
                        payload: {
                            score: res.data,
                            pop: resPop.data,
                            income: resIncome.data,
                            grp: resGrp.data,
                            employment: resEmploy.data,
                            severe_weather: resSWeath.data,
                            countyMetro: resMetro.data,
                            temperature: resTemp.data
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
            currentCounty.pop && setChartData({
                total: [
                    currentCounty.pop.popestimate2011,
                    currentCounty.pop.popestimate2012,
                    currentCounty.pop.popestimate2013,
                    currentCounty.pop.popestimate2014,
                    currentCounty.pop.popestimate2015,
                    currentCounty.pop.popestimate2016,
                    currentCounty.pop.popestimate2017,
                    currentCounty.pop.popestimate2018,
                    currentCounty.pop.popestimate2019
                ],
                growth: [
                    (((currentCounty.pop.popestimate2011 - currentCounty.pop.popestimate2010) / currentCounty.pop.popestimate2010) * 100).toFixed(3),
                    (((currentCounty.pop.popestimate2012 - currentCounty.pop.popestimate2011) / currentCounty.pop.popestimate2011) * 100).toFixed(3),
                    (((currentCounty.pop.popestimate2013 - currentCounty.pop.popestimate2012) / currentCounty.pop.popestimate2012) * 100).toFixed(3),
                    (((currentCounty.pop.popestimate2014 - currentCounty.pop.popestimate2013) / currentCounty.pop.popestimate2013) * 100).toFixed(3),
                    (((currentCounty.pop.popestimate2015 - currentCounty.pop.popestimate2014) / currentCounty.pop.popestimate2014) * 100).toFixed(3),
                    (((currentCounty.pop.popestimate2016 - currentCounty.pop.popestimate2015) / currentCounty.pop.popestimate2015) * 100).toFixed(3),
                    (((currentCounty.pop.popestimate2017 - currentCounty.pop.popestimate2016) / currentCounty.pop.popestimate2016) * 100).toFixed(3),
                    (((currentCounty.pop.popestimate2018 - currentCounty.pop.popestimate2017) / currentCounty.pop.popestimate2017) * 100).toFixed(3),
                    (((currentCounty.pop.popestimate2019 - currentCounty.pop.popestimate2018) / currentCounty.pop.popestimate2018) * 100).toFixed(3),
                ]
            })
            if (!currentCounty.income) {
                if (emptyData.length === 0) {
                    setEmptyData([...emptyData, 'Income Data'])
                } else if (emptyData.length > 0 && !emptyData.includes('Income Data')) {
                    setEmptyData([...emptyData, 'Income Data'])
                }
            } else if (currentCounty.income) {
                setChartIncData({
                    total: [
                        currentCounty.income.y2011,
                        currentCounty.income.y2012,
                        currentCounty.income.y2013,
                        currentCounty.income.y2014,
                        currentCounty.income.y2015,
                        currentCounty.income.y2016,
                        currentCounty.income.y2017,
                        currentCounty.income.y2018
                    ],
                    growth: [
                        (((currentCounty.income.y2011 - currentCounty.income.y2010) / currentCounty.income.y2010) * 100).toFixed(3),
                        (((currentCounty.income.y2012 - currentCounty.income.y2011) / currentCounty.income.y2011) * 100).toFixed(3),
                        (((currentCounty.income.y2013 - currentCounty.income.y2012) / currentCounty.income.y2012) * 100).toFixed(3),
                        (((currentCounty.income.y2014 - currentCounty.income.y2013) / currentCounty.income.y2013) * 100).toFixed(3),
                        (((currentCounty.income.y2015 - currentCounty.income.y2014) / currentCounty.income.y2014) * 100).toFixed(3),
                        (((currentCounty.income.y2016 - currentCounty.income.y2015) / currentCounty.income.y2015) * 100).toFixed(3),
                        (((currentCounty.income.y2017 - currentCounty.income.y2016) / currentCounty.income.y2016) * 100).toFixed(3),
                        (((currentCounty.income.y2018 - currentCounty.income.y2017) / currentCounty.income.y2017) * 100).toFixed(3)
                    ]
                })
            }

            if (!currentCounty.grp_total) {
                if (emptyData.length === 0) {
                    setEmptyData([...emptyData, 'GDP Data'])
                } else if (emptyData.length > 0 && !emptyData.includes('GDP Data')) {
                    setEmptyData([...emptyData, 'GDP Data'])
                }
            } else if (currentCounty.grp_total) {
                setChartGdpData({
                    total: [
                        currentCounty.grp_total.grp_2011,
                        currentCounty.grp_total.grp_2012,
                        currentCounty.grp_total.grp_2013,
                        currentCounty.grp_total.grp_2014,
                        currentCounty.grp_total.grp_2015,
                        currentCounty.grp_total.grp_2016,
                        currentCounty.grp_total.grp_2017,
                        currentCounty.grp_total.grp_2018
                    ],
                    growth: [
                        (((currentCounty.grp_total.grp_2011 - currentCounty.grp_total.grp_2010) / currentCounty.grp_total.grp_2010) * 100).toFixed(3),
                        (((currentCounty.grp_total.grp_2012 - currentCounty.grp_total.grp_2011) / currentCounty.grp_total.grp_2011) * 100).toFixed(3),
                        (((currentCounty.grp_total.grp_2013 - currentCounty.grp_total.grp_2012) / currentCounty.grp_total.grp_2012) * 100).toFixed(3),
                        (((currentCounty.grp_total.grp_2014 - currentCounty.grp_total.grp_2013) / currentCounty.grp_total.grp_2013) * 100).toFixed(3),
                        (((currentCounty.grp_total.grp_2015 - currentCounty.grp_total.grp_2014) / currentCounty.grp_total.grp_2014) * 100).toFixed(3),
                        (((currentCounty.grp_total.grp_2016 - currentCounty.grp_total.grp_2015) / currentCounty.grp_total.grp_2015) * 100).toFixed(3),
                        (((currentCounty.grp_total.grp_2017 - currentCounty.grp_total.grp_2016) / currentCounty.grp_total.grp_2016) * 100).toFixed(3),
                        (((currentCounty.grp_total.grp_2018 - currentCounty.grp_total.grp_2017) / currentCounty.grp_total.grp_2017) * 100).toFixed(3)
                    ]
                })
            }
            if (!currentCounty.employment) {
                if (emptyData.length === 0) {
                    setEmptyData([...emptyData, 'Employment Data'])
                } else if (emptyData.length > 0 && !emptyData.includes('Employment Data')) {
                    setEmptyData([...emptyData, 'Employment Data'])
                }
            } else if (currentCounty.employment) {
                setChartEmpData({
                    total: [
                        currentCounty.employment.emp_2011,
                        currentCounty.employment.emp_2012,
                        currentCounty.employment.emp_2013,
                        currentCounty.employment.emp_2014,
                        currentCounty.employment.emp_2015,
                        currentCounty.employment.emp_2016,
                        currentCounty.employment.emp_2017,
                        currentCounty.employment.emp_2018
                    ],
                    growth: [
                        (((currentCounty.employment.emp_2011 - currentCounty.employment.emp_2010) / currentCounty.employment.emp_2010) * 100).toFixed(3),
                        (((currentCounty.employment.emp_2012 - currentCounty.employment.emp_2011) / currentCounty.employment.emp_2011) * 100).toFixed(3),
                        (((currentCounty.employment.emp_2013 - currentCounty.employment.emp_2012) / currentCounty.employment.emp_2012) * 100).toFixed(3),
                        (((currentCounty.employment.emp_2014 - currentCounty.employment.emp_2013) / currentCounty.employment.emp_2013) * 100).toFixed(3),
                        (((currentCounty.employment.emp_2015 - currentCounty.employment.emp_2014) / currentCounty.employment.emp_2014) * 100).toFixed(3),
                        (((currentCounty.employment.emp_2016 - currentCounty.employment.emp_2015) / currentCounty.employment.emp_2015) * 100).toFixed(3),
                        (((currentCounty.employment.emp_2017 - currentCounty.employment.emp_2016) / currentCounty.employment.emp_2016) * 100).toFixed(3),
                        (((currentCounty.employment.emp_2018 - currentCounty.employment.emp_2017) / currentCounty.employment.emp_2017) * 100).toFixed(3)
                    ]
                })
            }
            if (!currentCounty.temperature) {
                if (emptyData.length === 0) {
                    setEmptyData([...emptyData, 'Temperature Data'])
                } else if (emptyData.length > 0 && !emptyData.includes('Temperature Data')) {
                    setEmptyData([...emptyData, 'Temperature Data'])
                }
            } else if (currentCounty.temperature) {
                setChartTempData([
                    currentCounty.temperature.temp_jan,
                    currentCounty.temperature.temp_feb,
                    currentCounty.temperature.temp_mar,
                    currentCounty.temperature.temp_apr,
                    currentCounty.temperature.temp_may,
                    currentCounty.temperature.temp_jun,
                    currentCounty.temperature.temp_jul,
                    currentCounty.temperature.temp_aug,
                    currentCounty.temperature.temp_sep,
                    currentCounty.temperature.temp_oct,
                    currentCounty.temperature.temp_nov,
                    currentCounty.temperature.temp_dec,
                ])
            }
            if (!currentCounty.severe_weather_total) {
                if (emptyData.length === 0) {
                    setEmptyData([...emptyData, 'Severe Weather Data'])
                } else if (emptyData.length > 0 && !emptyData.includes('Severe Weather Data')) {
                    setEmptyData([...emptyData, 'Severe Weather Data'])
                }
            } else if (currentCounty.severe_weather_total) {
                setChartSwData([
                    currentCounty.severe_weather_total.pd_2015,
                    currentCounty.severe_weather_total.pd_2016,
                    currentCounty.severe_weather_total.pd_2017,
                    currentCounty.severe_weather_total.pd_2018,
                    currentCounty.severe_weather_total.pd_2019,
                    currentCounty.severe_weather_total.pd_2020,
                ])
            }
            if (currentCounty.grp.length === 0) {
                if (emptyData.length === 0) {
                    setEmptyData([...emptyData, 'GDP Data'])
                } else if (emptyData.length > 0 && !emptyData.includes('GDP Data')) {
                    setEmptyData([...emptyData, 'GDP Data'])
                }
            } else if (currentCounty.grp.length > 0) {
                setPieChartData({
                    labels: currentCounty.grp.map(item => item.description),
                    data: currentCounty.grp.map(item => ((item.grp_2018 / currentCounty.grp_total.grp_2018) * 100).toFixed(1))
                })
            }
        }

        !loading && setDataIfNotNull()

        return () => {
            isMounted.current = false;
            mounted = false;
        }
        // eslint-disable-next-line
    }, [currentCounty]);

    const getTopThree = () => {
        const sortedGrp = currentCounty.grp.sort((a, b) => {
            const c = a.grp_2018 === '(D)' ? 0 : (a.grp_2018 / currentCounty.grp_total.grp_2018);
            const d = b.grp_2018 === '(D)' ? 0 : (b.grp_2018 / currentCounty.grp_total.grp_2018);
            return d - c;
        });
        return {
            growth: ((sortedGrp[0].grp_2018 / currentCounty.grp_total.grp_2018)
                + (sortedGrp[1].grp_2018 / currentCounty.grp_total.grp_2018)
                + (sortedGrp[2].grp_2018 / currentCounty.grp_total.grp_2018)) * 100,
            total: +sortedGrp[0].grp_2018 + +sortedGrp[1].grp_2018 + +sortedGrp[2].grp_2018
        }
    }

    return (
        <>
            {loading && <div className="loading"></div>}
            {!loading && <div>
                {/* {!currentCounty && redirect()} */}
                <div className="container">
                    {<Score places={currentCounty} />}
                    {chartData.total.length > 0 && <Chart data={chartData} income={false} title='County Population' />}
                    {chartIncData.total.length > 0 && <Chart data={chartIncData} income={true} title='County Income' year='2018' />}
                    {chartGdpData.total.length > 0 && <Chart data={chartGdpData} income={true} title='County GDP' year='2018' />}
                    {chartEmpData.total.length > 0 && <Chart data={chartEmpData} income={false} title='County Employment' year='2018' />}
                    {chartTempData.length > 0 && <TempChart data={chartTempData} />}
                    {chartTempData.length > 0 && <div className="temp-chart-legend">
                        <div className="temp-chart-legend-item temp-cold"></div>
                        <span className="temp-chart-legend-text ml-05">Colder than average</span>
                        <div className="temp-chart-legend-item temp-hot ml-05"></div>
                        <span className="temp-chart-legend-text ml-05">Hotter than average</span>
                    </div>}
                    {chartSwData.length > 0 && <BarChart data={chartSwData} />}
                    {pieChartData.data.length > 0 && <PieChart data={pieChartData.data} labels={pieChartData.labels} />}
                    {/* {currentCounty.pop && <div className="table-container">
                        <h2 className="center-text mt-1 mb-05">County Population</h2>
                        <table className="sm-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Population</th>
                                    <th>Pop. Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(currentCounty.pop)
                                    .filter(key => key.startsWith('popestimate'))
                                    .map(key => {
                                        const year = key.slice(-4);
                                        return <tr key={year}>
                                            <td>{year}</td>
                                            <td>{currentCounty.pop[`popestimate${year}`].toLocaleString()}</td>
                                            {year === '2010'
                                                ? <td>-</td>
                                                : <td>{`${(((currentCounty.pop[`popestimate${year}`] - currentCounty.pop[`popestimate${year - 1}`]) / currentCounty.pop[`popestimate${year - 1}`]) * 100).toFixed(3)}%`}</td>}
                                        </tr>
                                    })}
                            </tbody>
                        </table> </div>}
                    {currentCounty.income && <div className="table-container">
                        <h2 className="center-text mt-1 mb-05">County Income</h2>
                        <table className="sm-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Income</th>
                                    <th>Income Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(currentCounty.income)
                                    .filter(key => key.startsWith('y'))
                                    .filter(key => +key.slice(-4) > 2008)
                                    .map(key => {
                                        const year = key.slice(-4);
                                        return <tr key={year}>
                                            <td>{year}</td>
                                            <td>{`$${(+currentCounty.income[`y${year}`]).toLocaleString()}`}</td>
                                            <td>{`${(((currentCounty.income[`y${year}`] - currentCounty.income[`y${year - 1}`]) / currentCounty.income[`y${year - 1}`]) * 100).toFixed(3)}%`}</td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>}
                    {currentCounty.employment && <div className="table-container">
                        <h2 className="center-text mt-1 mb-05">County Jobs</h2>
                        <table className="sm-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th># of Jobs</th>
                                    <th>Job Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(currentCounty.employment)
                                    .filter(key => key.startsWith('emp'))
                                    .filter(key => +key.slice(-4) > 2008)
                                    .map(key => {
                                        const year = key.slice(-4);
                                        return <tr key={year}>
                                            <td>{year}</td>
                                            <td>{(+currentCounty.employment[`emp_${year}`]).toLocaleString()}</td>
                                            <td>{`${(((currentCounty.employment[`emp_${year}`] - currentCounty.employment[`emp_${year - 1}`]) / currentCounty.employment[`emp_${year - 1}`]) * 100).toFixed(3)}%`}</td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>}
                    {currentCounty.grp_total && <div className="table-container">
                        <h2 className="center-text mt-1 mb-05">County GDP</h2>
                        <table className="sm-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Total GDP</th>
                                    <th>GDP Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(currentCounty.grp_total)
                                    .filter(key => key.startsWith('grp'))
                                    .filter(key => +key.slice(-4) > 2008)
                                    .map(key => {
                                        const year = key.slice(-4);
                                        return <tr key={year}>
                                            <td>{year}</td>
                                            <td>{`$${(+currentCounty.grp_total[`grp_${year}`] * 1000).toLocaleString()}`}</td>
                                            <td>{`${(((currentCounty.grp_total[`grp_${year}`] - currentCounty.grp_total[`grp_${year - 1}`]) / currentCounty.grp_total[`grp_${year - 1}`]) * 100).toFixed(3)}%`}</td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>} */}
                    {/* {currentCounty.severe_weather_total && <div className="table-container">
                        <h2 className="center-text mt-1 mb-05">County Severe Weather Damage</h2>
                        <table className="sm-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Total Property Damage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(currentCounty.severe_weather_total)
                                    .map(key => {
                                        const year = key.slice(-4);
                                        return <tr key={year}>
                                            <td>{year}</td>
                                            <td>{`$${(+currentCounty.severe_weather_total[`pd_${year}`]).toLocaleString()}`}</td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>} */}
                    {/* {currentCounty.grp.length > 0 && <> <h2 className="center-text mt-1">County GDP</h2>
                        <table className="mt-1">
                            <thead>
                                <tr>
                                    <th>Industry</th>
                                    <th>% of Economy</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Top 3 Total</td>
                                    <td>{`${getTopThree().growth.toFixed(3)}%`}</td>
                                    <td>{`$${(+getTopThree().total * 1000).toLocaleString()}`}</td>
                                </tr>
                                {currentCounty.grp.map((county, index) => {
                                    return <tr key={index}>
                                        <td>{county.description}</td>
                                        <td>{county.grp_2018 === '(D)' ? 'N/A' : `${((county.grp_2018 / currentCounty.grp_total.grp_2018) * 100).toFixed(3)}%`}</td>
                                        <td>{county.grp_2018 === '(D)' ? 'N/A' : `$${(+county.grp_2018 * 1000).toLocaleString()}`}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table> </>} */}
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

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../../store/index';
import Score from '../score/Score';
import Scores from '../score/Scores';
import Chart from '../chart/Chart';

const Metro = () => {
    const { state, dispatch } = useStore();
    const {
        currentCounties,
        currentMetro,
        metros } = state;
    const isMounted = useRef(true);
    const [loading, setLoading] = useState(true);
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
    const [emptyData, setEmptyData] = useState([]);
    let { cbsa } = useParams();

    useEffect(() => {
        let mounted = true;
        currentMetro.metro_name && dispatch({ type: 'setBanner', payload: currentMetro.metro_name });

        const getData = async () => {
            try {
                const res = await axios.get(`/counties/${cbsa}`);
                const resScore = await axios.get(`/metro/score/${cbsa}`);
                const resGrp = await axios.get(`/metro/grp/${cbsa}`);
                const resPop = await axios.get(`/metro/population/${cbsa}`);
                const resPie = await axios.get(`/metro/pie/${cbsa}`);
                if (mounted) {
                    dispatch({
                        type: 'setCurrentMetro', payload: {
                            score: resScore.data,
                            grp: resGrp.data,
                            pie: resPie.data,
                            pop: resPop.data,
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
            if (!currentMetro.pop) {
                if (emptyData.length === 0) {
                    setEmptyData([...emptyData, 'Population Data'])
                } else if (emptyData.length > 0 && !emptyData.includes('Population Data')) {
                    setEmptyData([...emptyData, 'Population Data'])
                }
            } else if (currentMetro.pop) {
                setChartData({
                    total: [
                        currentMetro.pop.popestimate2011,
                        currentMetro.pop.popestimate2012,
                        currentMetro.pop.popestimate2013,
                        currentMetro.pop.popestimate2014,
                        currentMetro.pop.popestimate2015,
                        currentMetro.pop.popestimate2016,
                        currentMetro.pop.popestimate2017,
                        currentMetro.pop.popestimate2018,
                        currentMetro.pop.popestimate2019
                    ],
                    growth: [
                        (((currentMetro.pop.popestimate2011 - currentMetro.pop.popestimate2010) / currentMetro.pop.popestimate2010) * 100).toFixed(3),
                        (((currentMetro.pop.popestimate2012 - currentMetro.pop.popestimate2011) / currentMetro.pop.popestimate2011) * 100).toFixed(3),
                        (((currentMetro.pop.popestimate2013 - currentMetro.pop.popestimate2012) / currentMetro.pop.popestimate2012) * 100).toFixed(3),
                        (((currentMetro.pop.popestimate2014 - currentMetro.pop.popestimate2013) / currentMetro.pop.popestimate2013) * 100).toFixed(3),
                        (((currentMetro.pop.popestimate2015 - currentMetro.pop.popestimate2014) / currentMetro.pop.popestimate2014) * 100).toFixed(3),
                        (((currentMetro.pop.popestimate2016 - currentMetro.pop.popestimate2015) / currentMetro.pop.popestimate2015) * 100).toFixed(3),
                        (((currentMetro.pop.popestimate2017 - currentMetro.pop.popestimate2016) / currentMetro.pop.popestimate2016) * 100).toFixed(3),
                        (((currentMetro.pop.popestimate2018 - currentMetro.pop.popestimate2017) / currentMetro.pop.popestimate2017) * 100).toFixed(3),
                        (((currentMetro.pop.popestimate2019 - currentMetro.pop.popestimate2018) / currentMetro.pop.popestimate2018) * 100).toFixed(3),
                    ]
                })
            }
            if (!currentMetro.pie.income) {
                if (emptyData.length === 0) {
                    setEmptyData([...emptyData, 'Income Data'])
                } else if (emptyData.length > 0 && !emptyData.includes('Income Data')) {
                    setEmptyData([...emptyData, 'Income Data'])
                }
            } else if (currentMetro.pie.income) {
                setChartIncData({
                    total: [
                        currentMetro.pie.income.pie_2011,
                        currentMetro.pie.income.pie_2012,
                        currentMetro.pie.income.pie_2013,
                        currentMetro.pie.income.pie_2014,
                        currentMetro.pie.income.pie_2015,
                        currentMetro.pie.income.pie_2016,
                        currentMetro.pie.income.pie_2017,
                        currentMetro.pie.income.pie_2018
                    ],
                    growth: [
                        (((currentMetro.pie.income.pie_2011 - currentMetro.pie.income.pie_2010) / currentMetro.pie.income.pie_2010) * 100).toFixed(3),
                        (((currentMetro.pie.income.pie_2012 - currentMetro.pie.income.pie_2011) / currentMetro.pie.income.pie_2011) * 100).toFixed(3),
                        (((currentMetro.pie.income.pie_2013 - currentMetro.pie.income.pie_2012) / currentMetro.pie.income.pie_2012) * 100).toFixed(3),
                        (((currentMetro.pie.income.pie_2014 - currentMetro.pie.income.pie_2013) / currentMetro.pie.income.pie_2013) * 100).toFixed(3),
                        (((currentMetro.pie.income.pie_2015 - currentMetro.pie.income.pie_2014) / currentMetro.pie.income.pie_2014) * 100).toFixed(3),
                        (((currentMetro.pie.income.pie_2016 - currentMetro.pie.income.pie_2015) / currentMetro.pie.income.pie_2015) * 100).toFixed(3),
                        (((currentMetro.pie.income.pie_2017 - currentMetro.pie.income.pie_2016) / currentMetro.pie.income.pie_2016) * 100).toFixed(3),
                        (((currentMetro.pie.income.pie_2018 - currentMetro.pie.income.pie_2017) / currentMetro.pie.income.pie_2017) * 100).toFixed(3)
                    ]
                })
            }
            if (!currentMetro.grp_total) {
                if (emptyData.length === 0) {
                    setEmptyData([...emptyData, 'GDP Data'])
                } else if (emptyData.length > 0 && !emptyData.includes('GDP Data')) {
                    setEmptyData([...emptyData, 'GDP Data'])
                }
            } else if (currentMetro.grp_total) {
                setChartGdpData({
                    total: [
                        currentMetro.grp_total.grp_2011,
                        currentMetro.grp_total.grp_2012,
                        currentMetro.grp_total.grp_2013,
                        currentMetro.grp_total.grp_2014,
                        currentMetro.grp_total.grp_2015,
                        currentMetro.grp_total.grp_2016,
                        currentMetro.grp_total.grp_2017,
                        currentMetro.grp_total.grp_2018
                    ],
                    growth: [
                        (((currentMetro.grp_total.grp_2011 - currentMetro.grp_total.grp_2010) / currentMetro.grp_total.grp_2010) * 100).toFixed(3),
                        (((currentMetro.grp_total.grp_2012 - currentMetro.grp_total.grp_2011) / currentMetro.grp_total.grp_2011) * 100).toFixed(3),
                        (((currentMetro.grp_total.grp_2013 - currentMetro.grp_total.grp_2012) / currentMetro.grp_total.grp_2012) * 100).toFixed(3),
                        (((currentMetro.grp_total.grp_2014 - currentMetro.grp_total.grp_2013) / currentMetro.grp_total.grp_2013) * 100).toFixed(3),
                        (((currentMetro.grp_total.grp_2015 - currentMetro.grp_total.grp_2014) / currentMetro.grp_total.grp_2014) * 100).toFixed(3),
                        (((currentMetro.grp_total.grp_2016 - currentMetro.grp_total.grp_2015) / currentMetro.grp_total.grp_2015) * 100).toFixed(3),
                        (((currentMetro.grp_total.grp_2017 - currentMetro.grp_total.grp_2016) / currentMetro.grp_total.grp_2016) * 100).toFixed(3),
                        (((currentMetro.grp_total.grp_2018 - currentMetro.grp_total.grp_2017) / currentMetro.grp_total.grp_2017) * 100).toFixed(3)
                    ]
                })
            }
            if (!currentMetro.pie.employment) {
                if (emptyData.length === 0) {
                    setEmptyData([...emptyData, 'Employment Data'])
                } else if (emptyData.length > 0 && !emptyData.includes('Employment Data')) {
                    setEmptyData([...emptyData, 'Employment Data'])
                }
            } else if (currentMetro.pie.employment) {
                setChartEmpData({
                    total: [
                        currentMetro.pie.employment.pie_2011,
                        currentMetro.pie.employment.pie_2012,
                        currentMetro.pie.employment.pie_2013,
                        currentMetro.pie.employment.pie_2014,
                        currentMetro.pie.employment.pie_2015,
                        currentMetro.pie.employment.pie_2016,
                        currentMetro.pie.employment.pie_2017,
                        currentMetro.pie.employment.pie_2018
                    ],
                    growth: [
                        (((currentMetro.pie.employment.pie_2011 - currentMetro.pie.employment.pie_2010) / currentMetro.pie.employment.pie_2010) * 100).toFixed(3),
                        (((currentMetro.pie.employment.pie_2012 - currentMetro.pie.employment.pie_2011) / currentMetro.pie.employment.pie_2011) * 100).toFixed(3),
                        (((currentMetro.pie.employment.pie_2013 - currentMetro.pie.employment.pie_2012) / currentMetro.pie.employment.pie_2012) * 100).toFixed(3),
                        (((currentMetro.pie.employment.pie_2014 - currentMetro.pie.employment.pie_2013) / currentMetro.pie.employment.pie_2013) * 100).toFixed(3),
                        (((currentMetro.pie.employment.pie_2015 - currentMetro.pie.employment.pie_2014) / currentMetro.pie.employment.pie_2014) * 100).toFixed(3),
                        (((currentMetro.pie.employment.pie_2016 - currentMetro.pie.employment.pie_2015) / currentMetro.pie.employment.pie_2015) * 100).toFixed(3),
                        (((currentMetro.pie.employment.pie_2017 - currentMetro.pie.employment.pie_2016) / currentMetro.pie.employment.pie_2016) * 100).toFixed(3),
                        (((currentMetro.pie.employment.pie_2018 - currentMetro.pie.employment.pie_2017) / currentMetro.pie.employment.pie_2017) * 100).toFixed(3)
                    ]
                })
            }
        }

        !loading && setDataIfNotNull();

        return () => {
            isMounted.current = false;
            mounted = false;
        }
        // eslint-disable-next-line
    }, [metros, currentMetro]);

    const getTopThree = () => {
        const sortedGrp = currentMetro.grp.sort((a, b) => {
            const c = a.grp_2018 === '(D)' ? 0 : (a.grp_2018 / currentMetro.grp_total.grp_2018);
            const d = b.grp_2018 === '(D)' ? 0 : (b.grp_2018 / currentMetro.grp_total.grp_2018);
            return d - c;
        });
        return {
            growth: ((sortedGrp[0].grp_2018 / currentMetro.grp_total.grp_2018)
                + (sortedGrp[1].grp_2018 / currentMetro.grp_total.grp_2018)
                + (sortedGrp[2].grp_2018 / currentMetro.grp_total.grp_2018)) * 100,
            total: +sortedGrp[0].grp_2018 + +sortedGrp[1].grp_2018 + +sortedGrp[2].grp_2018
        }
    }

    return (
        <>
            {loading && <div className="loading"></div>}
            {!loading && <div className='container'>
                {/* <div className='grid'> */}
                <div className="container main-content">
                    {!loading && <Score places={currentMetro} />}
                    {!loading && <Chart data={chartData} income={false} title='Metro Population' />}
                    {!loading && <Chart data={chartIncData} income={true} title='Metro Income' year='2018' />}
                    {!loading && <Chart data={chartGdpData} income={true} title='Metro GDP' year='2018' />}
                    {!loading && <Chart data={chartEmpData} income={false} title='Metro Employment' year='2018' />}
                    {currentMetro.pop && <div className="table-container">
                        <h2 className="center-text mt-1 mb-05">Metro Population</h2>
                        <table className="sm-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Population</th>
                                    <th>Pop. Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(currentMetro.pop)
                                    .filter(key => key.startsWith('popestimate'))
                                    .map(key => {
                                        const year = key.slice(-4);
                                        return <tr key={year}>
                                            <td>{year}</td>
                                            <td>{currentMetro.pop[`popestimate${year}`].toLocaleString()}</td>
                                            {year === '2010'
                                                ? <td>-</td>
                                                : <td>{`${(((currentMetro.pop[`popestimate${year}`] - currentMetro.pop[`popestimate${year - 1}`]) / currentMetro.pop[`popestimate${year - 1}`]) * 100).toFixed(3)}%`}</td>}
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>}
                    {currentMetro.pie.income && <div className="table-container">
                        <h2 className="center-text mt-1 mb-05">Metro Income</h2>
                        <table className="sm-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Income</th>
                                    <th>Income Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(currentMetro.pie.income)
                                    .filter(key => key.startsWith('pie'))
                                    .filter(key => +key.slice(-4) > 2008)
                                    .map(key => {
                                        const year = key.slice(-4);
                                        return <tr key={year}>
                                            <td>{year}</td>
                                            <td>{`$${(+currentMetro.pie.income[`pie_${year}`]).toLocaleString()}`}</td>
                                            <td>{`${(((currentMetro.pie.income[`pie_${year}`] - currentMetro.pie.income[`pie_${year - 1}`]) / currentMetro.pie.income[`pie_${year - 1}`]) * 100).toFixed(3)}%`}</td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>}
                    {currentMetro.pie.employment && <div className="table-container">
                        <h2 className="center-text mt-1 mb-05">Metro Jobs</h2>
                        <table className="sm-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th># of Jobs</th>
                                    <th>Job Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(currentMetro.pie.employment)
                                    .filter(key => key.startsWith('pie'))
                                    .filter(key => +key.slice(-4) > 2008)
                                    .map(key => {
                                        const year = key.slice(-4);
                                        return <tr key={year}>
                                            <td>{year}</td>
                                            <td>{(+currentMetro.pie.employment[`pie_${year}`]).toLocaleString()}</td>
                                            <td>{`${(((currentMetro.pie.employment[`pie_${year}`] - currentMetro.pie.employment[`pie_${year - 1}`]) / currentMetro.pie.employment[`pie_${year - 1}`]) * 100).toFixed(3)}%`}</td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>}
                    {currentMetro.grp_total && <div className="table-container">
                        <h2 className="center-text mt-1 mb-05">Metro GDP</h2>
                        <table className="sm-table">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Total GDP</th>
                                    <th>GDP Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(currentMetro.grp_total)
                                    .filter(key => key.startsWith('grp'))
                                    .filter(key => +key.slice(-4) > 2008)
                                    .map(key => {
                                        const year = key.slice(-4);
                                        return <tr key={year}>
                                            <td>{year}</td>
                                            <td>{`$${(+currentMetro.grp_total[`grp_${year}`] * 1000).toLocaleString()}`}</td>
                                            <td>{`${(((currentMetro.grp_total[`grp_${year}`] - currentMetro.grp_total[`grp_${year - 1}`]) / currentMetro.grp_total[`grp_${year - 1}`]) * 100).toFixed(3)}%`}</td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>}
                    {currentMetro.grp.length > 0 && <> <h2 className="center-text mt-1">Metro GDP Split</h2>
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
                                {currentMetro.grp.map((metro, index) => {
                                    return <tr key={index}>
                                        <td>{metro.description}</td>
                                        <td>{metro.grp_2018 === '(D)' ? 'N/A' : `${((metro.grp_2018 / currentMetro.grp_total.grp_2018) * 100).toFixed(3)}%`}</td>
                                        <td>{metro.grp_2018 === '(D)' ? 'N/A' : `$${(+metro.grp_2018 * 1000).toLocaleString()}`}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table> </>}
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
                {/* <div className="mt-1 side-content">
                {!loading && <h2 className="center-text">Counties In {currentMetro.metro_name}</h2>}
                <div className="county-list-container mt-1">
                    {!loading && currentCounties.map(county => {
                        return <Scores
                            places={county}
                            placeToShow={'county'}
                            classToBe={'metro-item'}
                            key={county.fips} />
                    })}
                </div>
            </div> */}
            </div>}
        </>
    )
}

export default Metro

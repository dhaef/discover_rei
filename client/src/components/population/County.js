import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Score from '../score/Score';

const County = () => {
    const { state, dispatch } = useStore();
    const { currentCounty,
    } = state;
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);

    useEffect(() => {
        let mounted = true;
        currentCounty && dispatch({ type: 'setBanner', payload: currentCounty.county_name });

        const getData = async () => {
            try {
                const res = await axios.get(`/county/score/${id}`);
                const resPop = await axios.get(`/county/population/${id}`);
                const resIncome = await axios.get(`/county/income/${id}`);
                const resGrp = await axios.get(`/county/grp/${id}`);
                const resEmploy = await axios.get(`/county/employment/${id}`);
                const resSWeath = await axios.get(`/county/severe_weather/${id}`);
                if (mounted) {
                    dispatch({
                        type: 'setCountyData',
                        payload: {
                            score: res.data,
                            pop: resPop.data,
                            income: resIncome.data,
                            grp: resGrp.data,
                            employment: resEmploy.data,
                            severe_weather: resSWeath.data
                        }
                    });
                    setLoading(false);
                }
            } catch (error) {
                throw error;
            }
        };

        getData();
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
        <div>
            {/* {!currentCounty && redirect()} */}
            {loading && <div className="loading"></div>}
            <div className="container">
                {!loading && <Score places={currentCounty} />}
                <div className="table-container">
                    {!loading && <> <h2 className="center-text mt-1 mb-05">County Population</h2>
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
                        </table> </>}
                </div>
                <div className="table-container">
                    {!loading && <> <h2 className="center-text mt-1 mb-05">County Income</h2>
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
                        </table> </>}
                </div>
                <div className="table-container">
                    {!loading && <> <h2 className="center-text mt-1 mb-05">County Jobs</h2>
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
                        </table> </>}
                </div>
                <div className="table-container">
                    {!loading && <> <h2 className="center-text mt-1 mb-05">County GDP</h2>
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
                        </table> </>}
                </div>
                <div className="table-container">
                    {!loading && <> <h2 className="center-text mt-1 mb-05">County Severe Weather Damage</h2>
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
                        </table> </>}
                </div>
                {!loading && <> <h2 className="center-text mt-1">County GDP</h2>
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
                    </table></>}
            </div>
        </div>
    )
}

export default County

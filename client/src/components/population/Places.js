import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../../store/index';

function Places({ type }) {
    const { state, dispatch } = useStore();
    const { metros, counties } = state;
    const [sortYear, setSortYear] = useState('popestimate2019');
    const [sortPop, setSortPop] = useState(250000);
    const isMounted = useRef(true);

    const getData = async () => {
        try {
            const resMetros = await axios.get('/metro');
            const resCounties = await axios.get('/counties');
            if (isMounted.current) {
                dispatch({ type: 'setPlaces', payload: { metros: resMetros.data, counties: resCounties.data } });
            }
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        getData();
        return () => {
            isMounted.current = false;
        };
        // eslint-disable-next-line
    }, [metros, counties]);

    useEffect(() => {
        dispatch({ type: 'setBanner', payload: type });
        // eslint-disable-next-line
    }, [type]);

    const onYearChange = e => setSortYear(e.target.value);
    const onPopChange = e => setSortPop(+e.target.value);

    const places = type === 'metro' ? metros : counties;

    return (
        <div className="container">
            {/* {loading && <h2>Loading...</h2>} */}
            <div className="mb-1 mt-1">
                <select
                    name="year"
                    className="select"
                    value={sortYear}
                    onChange={onYearChange}>
                    <option value="popestimate2019">2019</option>
                    <option value="popestimate2018">2018</option>
                    <option value="popestimate2017">2017</option>
                    <option value="popestimate2016">2016</option>
                    <option value="popestimate2015">2015</option>
                    <option value="popestimate2014">2014</option>
                    <option value="popestimate2013">2013</option>
                    <option value="popestimate2012">2012</option>
                    <option value="popestimate2011">2011</option>
                    <option value="avg">Avg</option>
                </select>
                <select
                    name="pop"
                    className="select ml-05"
                    value={sortPop}
                    onChange={onPopChange}>
                    <option value="0">All</option>
                    <option value="250000">250,000+</option>
                    <option value="500000">500,000+</option>
                    <option value="1000000">1,000,000+</option>
                </select>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th rowSpan="2">{type === 'metro' ? 'Metro Area' : 'County'}</th>
                            <th colSpan="11">Year-Over-Year Growth Rate</th>
                        </tr>
                        <tr>
                            {/* <th className={`${sortYear === 'avg' && 'selected'}`}>5Y</th>
                        <th className={`${sortYear === 'avg' && 'selected'}`}>10Y</th> */}
                            <th className={`${sortYear === 'avg' && 'selected'}`}>Avg</th>
                            <th className={`${sortYear === 'popestimate2019' && 'selected'}`}>2019</th>
                            <th className={`${sortYear === 'popestimate2018' && 'selected'}`}>2018</th>
                            <th className={`${sortYear === 'popestimate2017' && 'selected'}`}>2017</th>
                            <th className={`${sortYear === 'popestimate2016' && 'selected'}`}>2016</th>
                            <th className={`${sortYear === 'popestimate2015' && 'selected'}`}>2015</th>
                            <th className={`${sortYear === 'popestimate2014' && 'selected'}`}>2014</th>
                            <th className={`${sortYear === 'popestimate2013' && 'selected'}`}>2013</th>
                            <th className={`${sortYear === 'popestimate2012' && 'selected'}`}>2012</th>
                            <th className={`${sortYear === 'popestimate2011' && 'selected'}`}>2011</th>
                        </tr>
                    </thead>
                    <tbody>
                        {places.sort((a, b) => {
                            if (sortYear === 'avg') {
                                // let c = 0,
                                //     d = 0;
                                // for (let i = 2011; i < 2019; i++) {
                                //     c += (((a[`popestimate${i}`] - a[`popestimate${i - 1}`]) / a[`popestimate${i - 1}`]) * 100);
                                //     d += (((b[`popestimate${i}`] - b[`popestimate${i - 1}`]) / b[`popestimate${i - 1}`]) * 100);
                                // }
                                // c = c / 9;
                                // d = d / 9;
                                const a_growthRate19 = (((a.popestimate2019 - a.popestimate2018) / a.popestimate2018) * 100);
                                const a_growthRate18 = (((a.popestimate2018 - a.popestimate2017) / a.popestimate2017) * 100);
                                const a_growthRate17 = (((a.popestimate2017 - a.popestimate2016) / a.popestimate2016) * 100);
                                const a_growthRate16 = (((a.popestimate2016 - a.popestimate2015) / a.popestimate2015) * 100);
                                const a_growthRate15 = (((a.popestimate2015 - a.popestimate2014) / a.popestimate2014) * 100);
                                const a_growthRate14 = (((a.popestimate2014 - a.popestimate2013) / a.popestimate2013) * 100);
                                const a_growthRate13 = (((a.popestimate2013 - a.popestimate2012) / a.popestimate2012) * 100);
                                const a_growthRate12 = (((a.popestimate2012 - a.popestimate2011) / a.popestimate2011) * 100);
                                const a_growthRate11 = (((a.popestimate2011 - a.popestimate2010) / a.popestimate2010) * 100);
                                const avg_a = (a_growthRate19 + a_growthRate18 + a_growthRate17 + a_growthRate16 + a_growthRate15 + a_growthRate14 + a_growthRate13 +
                                    a_growthRate12 + a_growthRate11) / 9;
                                const b_growthRate19 = (((b.popestimate2019 - b.popestimate2018) / b.popestimate2018) * 100);
                                const b_growthRate18 = (((b.popestimate2018 - b.popestimate2017) / b.popestimate2017) * 100);
                                const b_growthRate17 = (((b.popestimate2017 - b.popestimate2016) / b.popestimate2016) * 100);
                                const b_growthRate16 = (((b.popestimate2016 - b.popestimate2015) / b.popestimate2015) * 100);
                                const b_growthRate15 = (((b.popestimate2015 - b.popestimate2014) / b.popestimate2014) * 100);
                                const b_growthRate14 = (((b.popestimate2014 - b.popestimate2013) / b.popestimate2013) * 100);
                                const b_growthRate13 = (((b.popestimate2013 - b.popestimate2012) / b.popestimate2012) * 100);
                                const b_growthRate12 = (((b.popestimate2012 - b.popestimate2011) / b.popestimate2011) * 100);
                                const b_growthRate11 = (((b.popestimate2011 - b.popestimate2010) / b.popestimate2010) * 100);
                                const avg_b = (b_growthRate19 + b_growthRate18 + b_growthRate17 + b_growthRate16 + b_growthRate15 + b_growthRate14 + b_growthRate13 +
                                    b_growthRate12 + b_growthRate11) / 9;

                                // if (a.county_name === 'Loving County, TX') {
                                // console.log(a.county_name, c, b.county_name, d);
                                // }
                                // return d - c;
                                return avg_b - avg_a;
                            } else {
                                const lastYear = `popestimate${(sortYear.slice(11) - 1)}`;
                                const c = (((a[sortYear] - a[lastYear]) / a[lastYear]) * 100);
                                const d = (((b[sortYear] - b[lastYear]) / b[lastYear]) * 100);
                                return d - c;
                            }
                        }).map((place, index) => {
                            const growthRate19 = (((place.popestimate2019 - place.popestimate2018) / place.popestimate2018) * 100);
                            const growthRate18 = (((place.popestimate2018 - place.popestimate2017) / place.popestimate2017) * 100);
                            const growthRate17 = (((place.popestimate2017 - place.popestimate2016) / place.popestimate2016) * 100);
                            const growthRate16 = (((place.popestimate2016 - place.popestimate2015) / place.popestimate2015) * 100);
                            const growthRate15 = (((place.popestimate2015 - place.popestimate2014) / place.popestimate2014) * 100);
                            const growthRate14 = (((place.popestimate2014 - place.popestimate2013) / place.popestimate2013) * 100);
                            const growthRate13 = (((place.popestimate2013 - place.popestimate2012) / place.popestimate2012) * 100);
                            const growthRate12 = (((place.popestimate2012 - place.popestimate2011) / place.popestimate2011) * 100);
                            const growthRate11 = (((place.popestimate2011 - place.popestimate2010) / place.popestimate2010) * 100);
                            const avg = (growthRate19 + growthRate18 + growthRate17 + growthRate16 + growthRate15 + growthRate14 + growthRate13 +
                                growthRate12 + growthRate11) / 9;
                            // const y5 = (((place.popestimate2019 / place.popestimate2014) ** (1 / 5)) - 1) * 100;
                            // const y9 = (((place.popestimate2019 / place.popestimate2010) ** (1 / 9)) - 1) * 100;

                            if (place.popestimate2019 > sortPop) {
                                return <tr key={place[`${type}_area_id`]}>
                                    <td>
                                        {type === 'metro'
                                            ? <Link
                                                to={`/metro/${place.cbsa}`}
                                                className="link"
                                            // onClick={() => dispatch({ type: 'setCurrentMetro', payload: place })}
                                            >
                                                {place[`${type}_name`]}
                                            </Link>
                                            : <Link
                                                to={`/county/${place.fips}`}
                                                className="link"
                                            // onClick={() => dispatch({ type: 'setCurrentCounty', payload: place })}
                                            >
                                                {place[`${type}_name`]}
                                            </Link>}
                                    </td>
                                    {/* <td className={`center-text ${y5 > 2 ? 'great' : y5 > 0 ? 'good' : y5 < -2 ? 'bad' : 'not-good'}`}>{y5.toFixed(3)}%</td>
                                <td className={`center-text ${y9 > 2 ? 'great' : y9 > 0 ? 'good' : y9 < -2 ? 'bad' : 'not-good'}`}>{y9.toFixed(3)}%</td> */}
                                    <td className={`center-text ${avg > 2 ? 'great' : avg > 0 ? 'good' : avg < -2 ? 'bad' : 'not-good'}`}>{avg.toFixed(3)}%</td>
                                    <td className={`center-text ${growthRate19 > 2 ? 'great' : growthRate19 > 0 ? 'good' : growthRate19 < -2 ? 'bad' : 'not-good'}`}>{growthRate19.toFixed(3)}%</td>
                                    <td className={`center-text ${growthRate18 > 2 ? 'great' : growthRate18 > 0 ? 'good' : growthRate18 < -2 ? 'bad' : 'not-good'}`}>{growthRate18.toFixed(3)}%</td>
                                    <td className={`center-text ${growthRate17 > 2 ? 'great' : growthRate17 > 0 ? 'good' : growthRate17 < -2 ? 'bad' : 'not-good'}`}>{growthRate17.toFixed(3)}%</td>
                                    <td className={`center-text ${growthRate16 > 2 ? 'great' : growthRate16 > 0 ? 'good' : growthRate16 < -2 ? 'bad' : 'not-good'}`}>{growthRate16.toFixed(3)}%</td>
                                    <td className={`center-text ${growthRate15 > 2 ? 'great' : growthRate15 > 0 ? 'good' : growthRate15 < -2 ? 'bad' : 'not-good'}`}>{growthRate15.toFixed(3)}%</td>
                                    <td className={`center-text ${growthRate14 > 2 ? 'great' : growthRate14 > 0 ? 'good' : growthRate14 < -2 ? 'bad' : 'not-good'}`}>{growthRate14.toFixed(3)}%</td>
                                    <td className={`center-text ${growthRate13 > 2 ? 'great' : growthRate13 > 0 ? 'good' : growthRate13 < -2 ? 'bad' : 'not-good'}`}>{growthRate13.toFixed(3)}%</td>
                                    <td className={`center-text ${growthRate12 > 2 ? 'great' : growthRate12 > 0 ? 'good' : growthRate12 < -2 ? 'bad' : 'not-good'}`}>{growthRate12.toFixed(3)}%</td>
                                    <td className={`center-text ${growthRate11 > 2 ? 'great' : growthRate11 > 0 ? 'good' : growthRate11 < -2 ? 'bad' : 'not-good'}`}>{growthRate11.toFixed(3)}%</td>
                                </tr>;
                            }
                            return null;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Places;

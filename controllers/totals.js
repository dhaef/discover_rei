const db = require('../db/index');

exports.getTotals = async (req, res) => {
    const text = "SELECT geofips, json_agg(json_build_array(description, grp_2018)) FROM grp_by_area GROUP BY geofips";
    // const text = "SELECT * FROM grp_by_area";
    pool.query(text, (err, result) => {
        if (err) {
            throw err
        }
        const county45b = [];
        const county45_55 = [];
        const county55_65 = [];
        const county65a = [];

        result.rows.map((county, index) => {
            const totalVal = county.json_agg.find(item => item[0] === 'All industry total');
            const testArr = []
            county.json_agg.map(item => {
                if (item[0] === 'All industry total'
                    || item[0] === 'Private industries'
                    || item[0] === 'Durable goods manufacturing'
                    || item[0] === 'Nondurable goods manufacturing'
                    || item[0] === 'Finance and insurance'
                    || item[0] === 'Real estate and rental and leasing'
                    || item[0] === 'Professional, scientific, and technical services'
                    || item[0] === 'Management of companies and enterprises'
                    || item[0] === 'Administrative and support and waste management and remediation services'
                    || item[0] === 'Educational services'
                    || item[0] === 'Health care and social assistance'
                    || item[0] === 'Arts, entertainment, and recreation'
                    || item[0] === 'Accommodation and food services'
                    || item[0] === 'Private goods-producing industries 2/'
                    || item[0] === 'Private services-providing industries 3/'
                    || item[0] === 'Natural resources and mining'
                    || item[0] === 'Trade'
                    || item[0] === 'Transportation and utilities'
                    || item[0] === 'Manufacturing and information') {
                    return;
                } else {
                    testArr.push(item);
                    return item;
                }
            })
            testArr.sort((a, b) => {
                const c = a[1] === '(D)' ? 0 : ((+a[1]) / (+totalVal[1]));
                const d = b[1] === '(D)' ? 0 : ((+b[1]) / (+totalVal[1]));
                return +d - +c;
            });

            if (testArr[0] !== undefined && testArr[1] !== undefined && testArr[2] !== undefined) {

                const totalTop3 = ((+testArr[0][1] / +totalVal[1])
                    + (+testArr[1][1] / +totalVal[1])
                    + (+testArr[2][1] / +totalVal[1])) * 100;
                // console.log(totalTop3);
                if (totalTop3 <= 45) {
                    county45b.push(totalTop3);
                } else if (totalTop3 > 45 && totalTop3 <= 55) {
                    county45_55.push(totalTop3);
                } else if (totalTop3 > 55 && totalTop3 <= 65) {
                    county55_65.push(totalTop3);
                } else if (totalTop3 > 65) {
                    county65a.push(totalTop3);
                }
            }

        });
        console.log({
            county45b: county45b.length,
            county45_55: county45_55.length,
            county55_65: county55_65.length,
            county65a: county65a.length,
        })
        // console.log(result.rows)

        res.status(200).json(result.rows);
    });
}

exports.getSevereDmg = async (req, res) => {
    const text = "SELECT state_fips, cz_fips, json_agg(json_build_array(damage_property)) FROM severe_weather GROUP BY state_fips, cz_fips";
    pool.query(text, (err, result) => {
        if (err) {
            throw err
        }
        const dmg0 = [];
        const dmg1_1m = [];
        const dmg1m_10m = [];
        const dmg10m = [];
        result.rows.map(item => {
            let total = 0;
            item.json_agg.map(dmg => {
                if (dmg[0] === null) {
                    return
                } else if (dmg[0].endsWith('K')) {
                    total += (+dmg[0].split('.')[0] * 1000)
                } else if (dmg[0].endsWith('M')) {
                    total += (+dmg[0].split('.')[0] * 1000000)
                }
            });
            if (item.state_fips === 47 && item.cz_fips === 149) {
                console.log(total);
            }
            if (total === 0) {
                dmg0.push(total);
            } else if (total >= 1 && total < 1000000) {
                dmg1_1m.push(total);
            } else if (total >= 1000000 && total < 10000000) {
                dmg1m_10m.push(total);
            } else if (total >= 10000000) {
                dmg10m.push(total);
            }
        });
        console.log({
            dmg0: dmg0.length,
            dmg1_1m: dmg1_1m.length,
            dmg1m_10m: dmg1m_10m.length,
            dmg10m: dmg10m.length,
        })
        res.status(200).json(result.rows);
    });
}

exports.getCountyAvgTemp = async (req, res) => {
    const text = "SELECT * FROM county_avg_temp";
    // const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    // const values = [fips];
    const { rows } = await db.query(text);

    const results = [];

    rows.map((item, index) => {
        // if (index < 5000) {
        const inResults = results.find(place => place.fips === item.fips);
        // console.log(inResults);
        if (inResults) {
            const itemIndex = results.findIndex(place => place.fips === item.fips);
            results[itemIndex] = {
                ...results[itemIndex],
                data: {
                    jan: [...results[itemIndex].data.jan, item.jan],
                    feb: [...results[itemIndex].data.feb, item.feb],
                    mar: [...results[itemIndex].data.mar, item.mar],
                    apr: [...results[itemIndex].data.apr, item.apr],
                    may: [...results[itemIndex].data.may, item.may],
                    jun: [...results[itemIndex].data.jun, item.jun],
                    jul: [...results[itemIndex].data.jul, item.jul],
                    aug: [...results[itemIndex].data.aug, item.aug],
                    sep: [...results[itemIndex].data.sep, item.sep],
                    oct: [...results[itemIndex].data.oct, item.oct],
                    nov: [...results[itemIndex].data.nov, item.nov],
                    dec: [...results[itemIndex].data.dec, item.dec],
                }
                // data: [...results[itemIndex].data, [
                //     item.year,
                //     item.jan,
                //     item.feb,
                //     item.mar,
                //     item.apr,
                //     item.may,
                //     item.jun,
                //     item.jul,
                //     item.aug,
                //     item.sep,
                //     item.oct,
                //     item.nov,
                //     item.dec,
                // ]]
            }
        } else if (!inResults) {
            results.push({
                fips: item.fips,
                data: {
                    jan: [item.jan],
                    feb: [item.feb],
                    mar: [item.mar],
                    apr: [item.apr],
                    may: [item.may],
                    jun: [item.jun],
                    jul: [item.jul],
                    aug: [item.aug],
                    sep: [item.sep],
                    oct: [item.oct],
                    nov: [item.nov],
                    dec: [item.dec],
                }
                // data: [
                //     [
                //         item.year,
                //         item.jan,
                //         item.feb,
                //         item.mar,
                //         item.apr,
                //         item.may,
                //         item.jun,
                //         item.jul,
                //         item.aug,
                //         item.sep,
                //         item.oct,
                //         item.nov,
                //         item.dec,
                //     ]
                // ]
            })
        }
        // }
    });
    const avgTemps = [];
    let num = 1;
    results.map(async place => {
        try {
            // console.log(+(place.fips.toString()[0]))
            let newFips;
            if (place.fips.toString().startsWith('3') && place.fips.toString().length === 4) {
                newFips = `2${place.fips.toString().slice(1)}`
            } else if (place.fips.toString().startsWith('1') && place.fips.toString().length === 4) {
                newFips = `1${place.fips.toString().slice(1)}`
            } else if (place.fips.toString().startsWith('2') && place.fips.toString().length === 4) {
                newFips = `4${place.fips.toString().slice(1)}`
            } else if (place.fips.toString().startsWith('4') && place.fips.toString().length === 4) {
                newFips = `6${place.fips.toString().slice(1)}`
            } else if (place.fips.toString().startsWith('5') && place.fips.toString().length === 4) {
                newFips = `8${place.fips.toString().slice(1)}`
            } else if (place.fips.toString().startsWith('6') && place.fips.toString().length === 4) {
                newFips = `9${place.fips.toString().slice(1)}`
            } else if (place.fips.toString().startsWith('7') && place.fips.toString().length === 4) {
                newFips = `10${place.fips.toString().slice(1)}`
            } else if (place.fips.toString().startsWith('8') && place.fips.toString().length === 4) {
                newFips = `12${place.fips.toString().slice(1)}`
            } else if (place.fips.toString().startsWith('9') && place.fips.toString().length === 4) {
                newFips = `13${place.fips.toString().slice(1)}`
            } else if (place.fips.toString().startsWith('10') && place.fips.toString().length === 5) {
                newFips = `16${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('11') && place.fips.toString().length === 5) {
                newFips = `17${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('12') && place.fips.toString().length === 5) {
                newFips = `18${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('13') && place.fips.toString().length === 5) {
                newFips = `19${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('14') && place.fips.toString().length === 5) {
                newFips = `20${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('15') && place.fips.toString().length === 5) {
                newFips = `21${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('16') && place.fips.toString().length === 5) {
                newFips = `22${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('17') && place.fips.toString().length === 5) {
                newFips = `23${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('18') && place.fips.toString().length === 5) {
                newFips = `24${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('19') && place.fips.toString().length === 5) {
                newFips = `25${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('20') && place.fips.toString().length === 5) {
                newFips = `26${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('21') && place.fips.toString().length === 5) {
                newFips = `27${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('22') && place.fips.toString().length === 5) {
                newFips = `28${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('23') && place.fips.toString().length === 5) {
                newFips = `29${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('24') && place.fips.toString().length === 5) {
                newFips = `30${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('25') && place.fips.toString().length === 5) {
                newFips = `31${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('26') && place.fips.toString().length === 5) {
                newFips = `32${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('27') && place.fips.toString().length === 5) {
                newFips = `33${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('28') && place.fips.toString().length === 5) {
                newFips = `34${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('29') && place.fips.toString().length === 5) {
                newFips = `35${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('30') && place.fips.toString().length === 5) {
                newFips = `36${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('31') && place.fips.toString().length === 5) {
                newFips = `37${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('32') && place.fips.toString().length === 5) {
                newFips = `38${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('33') && place.fips.toString().length === 5) {
                newFips = `39${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('34') && place.fips.toString().length === 5) {
                newFips = `40${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('35') && place.fips.toString().length === 5) {
                newFips = `41${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('36') && place.fips.toString().length === 5) {
                newFips = `42${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('37') && place.fips.toString().length === 5) {
                newFips = `44${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('38') && place.fips.toString().length === 5) {
                newFips = `45${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('39') && place.fips.toString().length === 5) {
                newFips = `46${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('40') && place.fips.toString().length === 5) {
                newFips = `47${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('41') && place.fips.toString().length === 5) {
                newFips = `48${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('42') && place.fips.toString().length === 5) {
                newFips = `49${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('43') && place.fips.toString().length === 5) {
                newFips = `50${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('44') && place.fips.toString().length === 5) {
                newFips = `51${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('45') && place.fips.toString().length === 5) {
                newFips = `53${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('46') && place.fips.toString().length === 5) {
                newFips = `54${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('47') && place.fips.toString().length === 5) {
                newFips = `55${place.fips.toString().slice(2)}`
            } else if (place.fips.toString().startsWith('48') && place.fips.toString().length === 5) {
                newFips = `56${place.fips.toString().slice(2)}`
            } else {
                newFips = `${num}`
                num = num + 1
            }
            // console.log(newFips);
            const q_text = 'INSERT INTO county_temperature(fips, temp_jan, temp_feb, temp_mar, temp_apr, temp_may, temp_jun, temp_jul, temp_aug, temp_sep, temp_oct, temp_nov, temp_dec) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
            const values = [
                +newFips,
                +((place.data.jan.reduce((a, b) => +a + +b, 0)) / place.data.jan.length).toFixed(2),
                +((place.data.feb.reduce((a, b) => +a + +b, 0)) / place.data.feb.length).toFixed(2),
                +((place.data.mar.reduce((a, b) => +a + +b, 0)) / place.data.mar.length).toFixed(2),
                +((place.data.apr.reduce((a, b) => +a + +b, 0)) / place.data.apr.length).toFixed(2),
                +((place.data.may.reduce((a, b) => +a + +b, 0)) / place.data.may.length).toFixed(2),
                +((place.data.jun.reduce((a, b) => +a + +b, 0)) / place.data.jun.length).toFixed(2),
                +((place.data.jul.reduce((a, b) => +a + +b, 0)) / place.data.jul.length).toFixed(2),
                +((place.data.aug.reduce((a, b) => +a + +b, 0)) / place.data.aug.length).toFixed(2),
                +((place.data.sep.reduce((a, b) => +a + +b, 0)) / place.data.sep.length).toFixed(2),
                +((place.data.oct.reduce((a, b) => +a + +b, 0)) / place.data.oct.length).toFixed(2),
                +((place.data.nov.reduce((a, b) => +a + +b, 0)) / place.data.nov.length).toFixed(2),
                +((place.data.dec.reduce((a, b) => +a + +b, 0)) / place.data.dec.length).toFixed(2),
            ]
            // const avgObj = {
            //     fips: place.fips,
            //     avg_temps: {
            //         jan: +((place.data.jan.reduce((a, b) => +a + +b, 0)) / place.data.jan.length).toFixed(2),
            //         feb: +((place.data.feb.reduce((a, b) => +a + +b, 0)) / place.data.feb.length).toFixed(2),
            //         mar: +((place.data.mar.reduce((a, b) => +a + +b, 0)) / place.data.mar.length).toFixed(2),
            //         apr: +((place.data.apr.reduce((a, b) => +a + +b, 0)) / place.data.apr.length).toFixed(2),
            //         may: +((place.data.may.reduce((a, b) => +a + +b, 0)) / place.data.may.length).toFixed(2),
            //         jun: +((place.data.jun.reduce((a, b) => +a + +b, 0)) / place.data.jun.length).toFixed(2),
            //         jul: +((place.data.jul.reduce((a, b) => +a + +b, 0)) / place.data.jul.length).toFixed(2),
            //         aug: +((place.data.aug.reduce((a, b) => +a + +b, 0)) / place.data.aug.length).toFixed(2),
            //         sep: +((place.data.sep.reduce((a, b) => +a + +b, 0)) / place.data.sep.length).toFixed(2),
            //         oct: +((place.data.oct.reduce((a, b) => +a + +b, 0)) / place.data.oct.length).toFixed(2),
            //         nov: +((place.data.nov.reduce((a, b) => +a + +b, 0)) / place.data.nov.length).toFixed(2),
            //         dec: +((place.data.dec.reduce((a, b) => +a + +b, 0)) / place.data.dec.length).toFixed(2),
            //     }
            // }

            await db.query(q_text, values);
            // avgTemps.push(avgObj);
        } catch (error) {
            console.log(error)
        }
    });

    // avgTemps.map(async place => {
    //     const values = [
    //         place.fips,
    //         place.jan,
    //         place.feb,
    //         place.mar,
    //         place.apr,
    //         place.may,
    //         place.jun,
    //         place.jul,
    //         place.aug,
    //         place.sep,
    //         place.oct,
    //         place.nov,
    //         place.dec
    //     ];
    //     await db.query(q_text, values);
    // });

    // console.log(results)
    // res.status(200);
    res.status(200).json(avgTemps[30]);
    // res.status(200).json(rows);
}

exports.getMetroTemp = async (req, res) => {
    const text = "SELECT * FROM county_temperature";
    const { rows } = await db.query(text);

    const results = [];
    rows.forEach(item => {
        if (!item.cbsa) { return }
        const inResults = results.find(currentItem => currentItem.cbsa === item.cbsa);
        if (inResults) {
            const itemIndex = results.findIndex(place => place.cbsa === item.cbsa);
            results[itemIndex] = {
                ...results[itemIndex],
                data: [...results[itemIndex].data, item]
            }
        } else {
            const newObj = {
                cbsa: item.cbsa,
                data: [item]
            }
            results.push(newObj);
        }
    })
    const metro_avgs = []
    const metro_text = 'INSERT INTO metro_temperature(cbsa, temp_jan, temp_feb, temp_mar, temp_apr, temp_may, temp_jun, temp_jul, temp_aug, temp_sep, temp_oct, temp_nov, temp_dec) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
    results.forEach(async item => {
        const metro_values = [
            item.cbsa,
            +((item.data.reduce((sum, { temp_jan }) => sum + +temp_jan, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_feb }) => sum + +temp_feb, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_mar }) => sum + +temp_mar, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_apr }) => sum + +temp_apr, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_may }) => sum + +temp_may, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_jun }) => sum + +temp_jun, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_jul }) => sum + +temp_jul, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_aug }) => sum + +temp_aug, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_sep }) => sum + +temp_sep, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_oct }) => sum + +temp_oct, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_nov }) => sum + +temp_nov, 0)) / item.data.length).toFixed(2),
            +((item.data.reduce((sum, { temp_dec }) => sum + +temp_dec, 0)) / item.data.length).toFixed(2),
        ]
        // const newItem = {
        //     cbsa: item.cbsa,
        //     jan: (item.data.reduce((sum, { temp_jan }) => sum + +temp_jan, 0)) / item.data.length,
        //     feb: (item.data.reduce((sum, { temp_feb }) => sum + +temp_feb, 0)) / item.data.length,
        //     mar: (item.data.reduce((sum, { temp_mar }) => sum + +temp_mar, 0)) / item.data.length,
        //     apr: (item.data.reduce((sum, { temp_apr }) => sum + +temp_apr, 0)) / item.data.length,
        //     may: (item.data.reduce((sum, { temp_may }) => sum + +temp_may, 0)) / item.data.length,
        //     jun: (item.data.reduce((sum, { temp_jun }) => sum + +temp_jun, 0)) / item.data.length,
        //     jul: (item.data.reduce((sum, { temp_jul }) => sum + +temp_jul, 0)) / item.data.length,
        //     aug: (item.data.reduce((sum, { temp_aug }) => sum + +temp_aug, 0)) / item.data.length,
        //     sep: (item.data.reduce((sum, { temp_sep }) => sum + +temp_sep, 0)) / item.data.length,
        //     oct: (item.data.reduce((sum, { temp_oct }) => sum + +temp_oct, 0)) / item.data.length,
        //     nov: (item.data.reduce((sum, { temp_nov }) => sum + +temp_nov, 0)) / item.data.length,
        //     dec: (item.data.reduce((sum, { temp_dec }) => sum + +temp_dec, 0)) / item.data.length,
        // }
        // console.log(typeof newItem.jan);
        // metro_avgs.push(newItem)
        await db.query(metro_text, metro_values);
    });
    // console.log(metro_avgs.length);
    res.status(200).json(metro_avgs);
}

const counties = require('../areas.json');

exports.setCountySw = async (req, res) => {
    const text = "SELECT begin_yearmonth, state_fips, cz_fips, damage_property, cz_name, event_type, deaths_direct FROM severe_weather";
    const { rows } = await db.query(text);
    const results = [];
    rows.forEach((item, index) => {
        let state, county;
        if (item.state_fips.toString().length === 2) {
            state = item.state_fips;
        } else if (item.state_fips.toString().length === 1) {
            state = `0${item.state_fips}`;
        }
        if (item.cz_fips.toString().length === 3) {
            county = item.cz_fips;
        } else if (item.cz_fips.toString().length === 2) {
            county = `0${item.cz_fips}`;
        } else if (item.cz_fips.toString().length === 1) {
            county = `00${item.cz_fips}`;
        }

        const inResults = results.find(item => item.fips == `${state}${county}`);
        if (inResults) {
            const itemIndex = results.findIndex(cItem => cItem.fips == `${state}${county}`);
            results[itemIndex] = {
                ...results[itemIndex],
                data: [...results[itemIndex].data, { date: item.begin_yearmonth, damage_property: item.damage_property }]
            }
        } else {
            const newObj = {
                fips: `${state}${county}`,
                name: item.cz_name,
                data: [{ date: item.begin_yearmonth, damage_property: item.damage_property }]
            }
            const inCounties = counties.find(place => place.fips == `${state}${county}`);
            if (inCounties) {
                results.push(newObj)
            }
        }

    });
    // console.log(results[0])
    // console.log(results[240])
    // console.log(results[400])
    const totals = [];
    const sw_text = 'INSERT INTO county_severe_weather(fips, pd_2015, pd_2016, pd_2017, pd_2018, pd_2019, pd_2020) VALUES($1, $2, $3, $4, $5, $6, $7)';
    results.forEach(async item => {
        let total2015 = 0;
        let total2016 = 0;
        let total2017 = 0;
        let total2018 = 0;
        let total2019 = 0;
        let total2020 = 0;
        let amount;
        item.data.forEach(event => {
            if (!event.damage_property) {
                return null;
            } else if (event.damage_property.endsWith('K')) {
                amount = +event.damage_property.slice(0, -1) * 1000;
            } else if (event.damage_property.endsWith('M')) {
                amount = +event.damage_property.slice(0, -1) * 1000000;
            }

            if (event.date.toString().startsWith('2020')) {
                total2020 += amount;
            } else if (event.date.toString().startsWith('2019')) {
                total2019 += amount;
            } else if (event.date.toString().startsWith('2018')) {
                total2018 += amount;
            } else if (event.date.toString().startsWith('2017')) {
                total2017 += amount;
            } else if (event.date.toString().startsWith('2016')) {
                total2016 += amount;
            } else if (event.date.toString().startsWith('2015')) {
                total2015 += amount;
            }
        });

        // const total_item = {
        //     fips: item.fips,
        //     name: item.name,
        //     pd_2020: total2020,
        //     pd_2019: total2019,
        //     pd_2018: total2018,
        //     pd_2017: total2017,
        //     pd_2016: total2016,
        //     pd_2015: total2015,
        // }
        const sw_value = [
            item.fips,
            total2015,
            total2016,
            total2017,
            total2018,
            total2019,
            total2020
        ]
        await db.query(sw_text, sw_value);
        // totals.push(total_item);
    });
    // if (totals.find(item => item.fips == 49049)) {
    //     console.log('Yes')
    // }
    // console.log(totals[0])
    // console.log(totals[240])
    // console.log(totals.length)
    console.log('done');
    res.status(200);
    // res.status(200).json(results[0]);
}
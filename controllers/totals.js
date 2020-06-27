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
const db = require('../db/index');

exports.getCountyPop = async (req, res) => {
    const text = "SELECT fips, json_agg(json_build_array(popestimate2010, popestimate2011, popestimate2012, popestimate2013, popestimate2014, popestimate2015, popestimate2016, popestimate2017, popestimate2018, popestimate2019)) FROM county_area WHERE fips = $1 GROUP BY fips";
    // const text = "SELECT * FROM county_area WHERE fips = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getCountyScores = async (req, res) => {
    // const text = "SELECT * FROM county_score";
    const text = "SELECT county_name, cbsa, fips, COALESCE(pop_score,0) + COALESCE(pop_grow_score,0)+ COALESCE(emp_score,0)+ COALESCE(grp_score,0)+ COALESCE(grp_grow_score,0)+ COALESCE(sw_score,0) AS total, pop_score, pop_grow_score, emp_score, grp_score, grp_grow_score, sw_score FROM county_score";
    const { rows } = await db.query(text);
    res.status(200).json(rows);
}

exports.grabCounties = async (req, res) => {
    // const text = "SELECT * FROM county_score";
    const text = "SELECT county_name AS name, fips FROM county_score";
    const { rows } = await db.query(text);
    res.status(200).json(rows);
}

exports.getCountyScore = async (req, res) => {
    // const text = "SELECT * FROM county_score";
    const text = "SELECT county_name, cbsa, fips, COALESCE(pop_score,0) + COALESCE(pop_grow_score,0)+ COALESCE(emp_score,0)+ COALESCE(grp_score,0)+ COALESCE(grp_grow_score,0)+ COALESCE(sw_score,0) AS total, pop_score, pop_grow_score, emp_score, grp_score, grp_grow_score, sw_score FROM county_score WHERE fips = $1";
    const values = [req.params.id];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getCountyIncome = async (req, res) => {
    const text = "SELECT geofips, json_agg(json_build_array(y2010, y2011, y2012, y2013, y2014, y2015, y2016, y2017, y2018)) FROM personal_income WHERE geofips = $1 AND Description = 'Per capita personal income (dollars) 2/' GROUP BY geofips";
    // const text = "SELECT * FROM personal_income WHERE geofips = $1 AND Description = 'Per capita personal income (dollars) 2/'";
    const values = [req.params.id];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getCountyGrp = async (req, res) => {
    const text = "SELECT * FROM grp_by_area WHERE geofips = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getCountyGrpTotal = async (req, res) => {
    const text = "SELECT geofips, json_agg(json_build_array(grp_2010, grp_2011, grp_2012, grp_2013, grp_2014, grp_2015, grp_2016, grp_2017, grp_2018)) FROM grp_by_area WHERE geofips = $1 AND description = 'All industry total' GROUP BY geofips";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getCountyTemp = async (req, res) => {
    const text = "SELECT fips, json_agg(json_build_array(temp_jan, temp_feb, temp_mar, temp_apr, temp_may, temp_jun, temp_jul, temp_aug, temp_sep, temp_oct, temp_nov, temp_dec)) FROM county_temperature WHERE fips = $1 GROUP BY fips";
    // const text = "SELECT * FROM county_temperature WHERE fips = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    // console.log(req.params.id, fips);
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getCountyEmployment = async (req, res) => {
    const text = "SELECT * FROM employment_by_area WHERE geofips = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getCountyUnemployment = async (req, res) => {
    const text = "SELECT * FROM county_unemployment WHERE state_fips = $1 AND county_fips = $2 ORDER BY year";
    const stateFips = req.params.id.length === 4 ? req.params.id.slice(0, 1) : req.params.id.slice(0, 2);
    const countyFips = req.params.id.length === 4 ? req.params.id.slice(1) : req.params.id.slice(2);
    let cz_code;
    if (countyFips[0] === '0' && countyFips[1] === '0') {
        cz_code = countyFips[2];
    } else if (countyFips[0] === '0' && countyFips[1] !== '0') {
        cz_code = countyFips.slice(1);
    } else {
        cz_code = countyFips;
    }
    const values = [stateFips, cz_code];

    const { rows } = await db.query(text, values);

    res.status(200).json(rows);
}

exports.getCountySevereWeather = async (req, res) => {
    // const text = "SELECT begin_yearmonth, state_fips, cz_fips, damage_property, cz_name, event_type, deaths_direct FROM severe_weather WHERE state_fips = $1 AND cz_fips = $2";
    // const stateFips = req.params.id.length === 4 ? req.params.id.slice(0, 1) : req.params.id.slice(0, 2);
    // const countyFips = req.params.id.length === 4 ? req.params.id.slice(1) : req.params.id.slice(2);
    // let cz_code;
    // if (countyFips[0] === '0' && countyFips[1] === '0') {
    //     cz_code = countyFips[2];
    // } else if (countyFips[0] === '0' && countyFips[1] !== '0') {
    //     cz_code = countyFips.slice(1);
    // } else {
    //     cz_code = countyFips;
    // }
    // const values = [stateFips, cz_code];

    const text = "SELECT fips, json_agg(json_build_array(pd_2015, pd_2016, pd_2017, pd_2018, pd_2019, pd_2020)) FROM county_severe_weather WHERE fips = $1 GROUP BY fips";
    // const text = "SELECT * FROM county_severe_weather WHERE fips = $1";
    const values = [req.params.id];
    const { rows } = await db.query(text, values);

    res.status(200).json(rows);
}

exports.getAllCountyGrp = async (req, res) => {
    const text = "SELECT geofips, json_agg(json_build_array(description, grp_2018)) FROM grp_by_area GROUP BY geofips";
    const { rows } = await db.query(text);
    res.status(200).json(rows);
}

exports.getAllCountyEmp = async (req, res) => {
    const text = "SELECT geofips, geoname, emp_2007, emp_2008, emp_2009, emp_2010, emp_2011, emp_2012, emp_2013, emp_2014, emp_2015, emp_2016, emp_2017, emp_2018 FROM employment_by_area";
    const { rows } = await db.query(text);
    res.status(200).json(rows);
}

exports.getAllCountySw = async (req, res) => {
    const text = "SELECT state_fips, cz_fips, json_agg(json_build_array(damage_property)) FROM severe_weather GROUP BY state_fips, cz_fips";
    const { rows } = await db.query(text);
    res.status(200).json(rows);
}
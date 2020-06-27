const db = require('../db/index');

exports.getCountyPop = async (req, res) => {
    const text = "SELECT * FROM county_area WHERE fips = $1";
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
    const text = "SELECT * FROM personal_income WHERE geofips = $1 AND Description = 'Per capita personal income (dollars) 2/'";
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

exports.getCountyEmployment = async (req, res) => {
    const text = "SELECT * FROM employment_by_area WHERE geofips = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getCountySevereWeather = async (req, res) => {
    const text = "SELECT begin_yearmonth, state_fips, cz_fips, damage_property, cz_name, event_type, deaths_direct FROM severe_weather WHERE state_fips = $1 AND cz_fips = $2";
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
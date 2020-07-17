const db = require('../db/index');

exports.metros = async (req, res) => {
    const { rows } = await db.query('SELECT * FROM metro_area ORDER BY metro_name');
    res.status(200).json(rows);
};

exports.getMetroScores = async (req, res) => {
    const text = "SELECT metro_name, cbsa, COALESCE(pop_score,0) + COALESCE(pop_grow_score,0)+ COALESCE(emp_score,0)+ COALESCE(grp_score,0)+ COALESCE(grp_grow_score,0) AS total, pop_score, pop_grow_score, emp_score, grp_score, grp_grow_score FROM metro_score";
    // const text = "SELECT * FROM metro_score";
    const { rows } = await db.query(text);
    res.status(200).json(rows);
}

exports.grabMetros = async (req, res) => {
    const text = "SELECT metro_name AS name, cbsa AS fips FROM metro_score";
    // const text = "SELECT * FROM metro_score";
    const { rows } = await db.query(text);
    res.status(200).json(rows);
}

exports.getMetroScore = async (req, res) => {
    const text = "SELECT metro_name, cbsa, COALESCE(pop_score,0) + COALESCE(pop_grow_score,0)+ COALESCE(emp_score,0)+ COALESCE(grp_score,0)+ COALESCE(grp_grow_score,0) AS total, pop_score, pop_grow_score, emp_score, grp_score, grp_grow_score FROM metro_score WHERE cbsa = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const value = [fips];
    const { rows } = await db.query(text, value);
    res.status(200).json(rows);
}

exports.getMetroPop = async (req, res) => {
    const text = "SELECT cbsa, json_agg(json_build_array(popestimate2010, popestimate2011, popestimate2012, popestimate2013, popestimate2014, popestimate2015, popestimate2016, popestimate2017, popestimate2018, popestimate2019)) FROM metro_area WHERE cbsa = $1 GROUP BY cbsa";
    // const text = "SELECT * FROM metro_area WHERE cbsa = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getMetroGrp = async (req, res) => {
    // const text = "SELECT * FROM grp_by_metro WHERE (geofips = $1) AND (description <> 'All industry total' OR description <>  'Private industries' OR description <> 'Durable goods manufacturing' OR description <> 'Nondurable goods manufacturing' OR description <> 'Finance and insurancel' OR description <> 'Real estate and rental and leasing' OR description <> 'Professional, scientific, and technical services' OR description <> 'Management of companies and enterprises' OR description <> 'Administrative and support and waste management and remediation services' OR description <> 'Educational services' OR description <> 'Health care and social assistance' OR description <> 'All industry total' OR description <> 'Arts, entertainment, and recreation' OR description <> 'Accommodation and food services' OR description <> 'Private goods-producing industries 2/' OR description <> 'Private services-providing industries 3/' OR description <> 'Natural resources and mining' OR description <> 'Trade' OR description <> 'Transportation and utilities' OR description <> 'Manufacturing and information')";
    const text = "SELECT * FROM grp_by_metro WHERE geofips = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getMetroGrpTotal = async (req, res) => {
    const text = "SELECT geofips, json_agg(json_build_array(grp_2010, grp_2011, grp_2012, grp_2013, grp_2014, grp_2015, grp_2016, grp_2017, grp_2018)) FROM grp_by_metro WHERE geofips = $1 AND description = 'All industry total' GROUP BY geofips";
    // const text = "SELECT * FROM grp_by_metro WHERE geofips = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getMetroTemp = async (req, res) => {
    const text = "SELECT cbsa, json_agg(json_build_array(temp_jan, temp_feb, temp_mar, temp_apr, temp_may, temp_jun, temp_jul, temp_aug, temp_sep, temp_oct, temp_nov, temp_dec)) FROM metro_temperature WHERE cbsa = $1 GROUP BY cbsa";
    // const text = "SELECT * FROM metro_temperature WHERE cbsa = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getMetroPie = async (req, res) => {
    const text = "SELECT geofips, json_agg(json_build_array(pie_2010, pie_2011, pie_2012, pie_2013, pie_2014, pie_2015, pie_2016, pie_2017, pie_2018)) FROM pie_by_metro WHERE (geofips = $1 AND description = 'Per capita personal income (dollars) 4/') GROUP BY geofips";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getMetroUnemp = async (req, res) => {
    const text = "SELECT * FROM metro_unemployment WHERE fips = $1 AND year <> 2009";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getAllMetroGrp = async (req, res) => {
    const text = "SELECT geofips, json_agg(json_build_array(description, grp_2018)) FROM grp_by_metro GROUP BY geofips";
    const { rows } = await db.query(text);
    res.status(200).json(rows);
}

exports.getAllMetroEmp = async (req, res) => {
    const text = "SELECT geofips, geoname, pie_2007, pie_2008, pie_2009, pie_2010, pie_2011, pie_2012, pie_2013, pie_2014, pie_2015, pie_2016, pie_2017, pie_2018 FROM pie_by_metro WHERE description = 'Total employment'";
    const { rows } = await db.query(text);
    res.status(200).json(rows);
}

// exports.getAllMetroSw = async (req, res) => {
//     const text = "SELECT state_fips, cz_fips, json_agg(json_build_array(damage_property)) FROM severe_weather GROUP BY state_fips, cz_fips";
//     const { rows } = await db.query(text);
//     res.status(200).json(rows);
// }
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
    const text = "SELECT * FROM metro_area WHERE cbsa = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getMetroGrp = async (req, res) => {
    const text = "SELECT * FROM grp_by_metro WHERE geofips = $1";
    const fips = req.params.id.length === 4 ? `0${req.params.id}` : req.params.id;
    const values = [fips];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
}

exports.getMetroPie = async (req, res) => {
    const text = "SELECT * FROM pie_by_metro WHERE (geofips = $1 AND description = 'Per capita personal income (dollars) 4/') OR (geofips = $1 AND description = 'Total employment')";
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
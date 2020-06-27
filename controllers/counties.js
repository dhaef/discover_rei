const db = require('../db/index');

exports.getCounties = async (req, res) => {
    const { rows } = await db.query('SELECT * FROM county_area ORDER BY county_name');
    res.status(200).json(rows);
};

exports.selectCounties = async (req, res) => {
    const text = "SELECT * FROM county_area c INNER JOIN personal_income p ON c.fips = p.geofips WHERE c.cbsa = $1 AND p.Description = 'Per capita personal income (dollars) 2/'";
    const values = [req.params.cbsa];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
};
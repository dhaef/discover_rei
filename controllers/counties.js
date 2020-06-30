const db = require('../db/index');

exports.getCounties = async (req, res) => {
    const { rows } = await db.query('SELECT * FROM county_area ORDER BY county_name');
    res.status(200).json(rows);
};

exports.selectCounties = async (req, res) => {
    const text = "SELECT county_name, cbsa, fips, COALESCE(pop_score,0) + COALESCE(pop_grow_score,0)+ COALESCE(emp_score,0)+ COALESCE(grp_score,0)+ COALESCE(grp_grow_score,0)+ COALESCE(sw_score,0) AS total, pop_score, pop_grow_score, emp_score, grp_score, grp_grow_score, sw_score FROM county_score WHERE cbsa = $1";
    const values = [req.params.cbsa];
    const { rows } = await db.query(text, values);
    res.status(200).json(rows);
};
// exports.selectCounties = async (req, res) => {
//     const text = "SELECT * FROM county_area c INNER JOIN personal_income p ON c.fips = p.geofips WHERE c.cbsa = $1 AND p.Description = 'Per capita personal income (dollars) 2/'";
//     const values = [req.params.cbsa];
//     const { rows } = await db.query(text, values);
//     res.status(200).json(rows);
// };
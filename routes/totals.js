const express = require('express');
const { getSevereDmg,
    getTotals,
    getCountyAvgTemp,
    getMetroTemp,
    setCountySw
} = require('../controllers/totals');

const router = express.Router();

// router.get('/', getTotals);
// router.get('/avg-temp', getCountyAvgTemp);
// router.get('/severe_weather', getSevereDmg);
// router.get('/metro_temp', getMetroTemp);
// router.get('/county_sw', setCountySw);

module.exports = router;
const express = require('express');
const { getSevereDmg,
    getTotals,
    getCountyAvgTemp
} = require('../controllers/totals');

const router = express.Router();

// router.get('/', getTotals);
// router.get('/avg-temp', getCountyAvgTemp);
// router.get('/severe_weather', getSevereDmg);

module.exports = router;
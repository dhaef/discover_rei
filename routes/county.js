const express = require('express');
const { getCountyEmployment,
    // getCountyPop,
    getCountyGrp,
    getCountyIncome,
    getCountySevereWeather,
    getAllCountyEmp,
    getAllCountyGrp,
    getAllCountySw,
    getCountyScores,
    getCountyScore,
    getCountyPop,
    grabCounties,
    getCountyAvgTemp
} = require('../controllers/county');

const router = express.Router();

router.get('/score', getCountyScores);
router.get('/score/:id', getCountyScore);
router.get('/employment/', getAllCountyEmp);
router.get('/population/:id', getCountyPop);
router.get('/employment/:id', getCountyEmployment);
router.get('/grp/', getAllCountyGrp);
router.get('/grp/:id', getCountyGrp);
router.get('/income/:id', getCountyIncome);
router.get('/avg-temp', getCountyAvgTemp);
router.get('/severe_weather/', getAllCountySw);
router.get('/severe_weather/:id', getCountySevereWeather);
router.get('/grab', grabCounties);

module.exports = router;
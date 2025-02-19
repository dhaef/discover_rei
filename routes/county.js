const express = require('express');
const { getCountyEmployment,
    // getCountyPop,
    getCountyGrp,
    getCountyGrpTotal,
    getCountyIncome,
    getCountySevereWeather,
    getAllCountyEmp,
    getAllCountyGrp,
    getAllCountySw,
    getCountyScores,
    getCountyScore,
    getCountyPop,
    grabCounties,
    getCountyTemp,
    getCountyUnemployment
} = require('../controllers/county');

const router = express.Router();

router.get('/score', getCountyScores);
router.get('/score/:id', getCountyScore);
router.get('/employment/', getAllCountyEmp);
router.get('/population/:id', getCountyPop);
router.get('/employment/:id', getCountyEmployment);
router.get('/unemployment/:id', getCountyUnemployment);
router.get('/grp/', getAllCountyGrp);
router.get('/grp/:id', getCountyGrp);
router.get('/grp_total/:id', getCountyGrpTotal);
router.get('/income/:id', getCountyIncome);
router.get('/severe_weather/', getAllCountySw);
router.get('/severe_weather/:id', getCountySevereWeather);
router.get('/temperature/:id', getCountyTemp);
router.get('/grab', grabCounties);

module.exports = router;
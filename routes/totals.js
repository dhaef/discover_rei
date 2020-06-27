const express = require('express');
const { getSevereDmg,
    getTotals
} = require('../controllers/totals');

const router = express.Router();

router.get('/', getTotals);
router.get('/severe_weather', getSevereDmg);

module.exports = router;
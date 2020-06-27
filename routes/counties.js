const express = require('express');
const { getCounties, selectCounties } = require('../controllers/counties');

const router = express.Router();

router.get('/', getCounties);
router.get('/:cbsa', selectCounties);

module.exports = router;
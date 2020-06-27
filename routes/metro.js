const express = require('express');
const { metros,
    getMetroGrp,
    getMetroPie,
    getAllMetroEmp,
    getAllMetroGrp,
    getMetroScores,
    getMetroScore,
    getMetroPop,
    grabMetros
} = require('../controllers/metro');

const router = express.Router();

router.get('/', metros);
router.get('/score', getMetroScores);
router.get('/score/:id', getMetroScore);
router.get('/population/:id', getMetroPop);
router.get('/employment', getAllMetroEmp);
router.get('/grp', getAllMetroGrp);
router.get('/grp/:id', getMetroGrp);
router.get('/pie/:id', getMetroPie);
router.get('/grab', grabMetros);

module.exports = router;
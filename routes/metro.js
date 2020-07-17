const express = require('express');
const { metros,
    getMetroGrp,
    getMetroGrpTotal,
    getMetroPie,
    getAllMetroEmp,
    getAllMetroGrp,
    getMetroScores,
    getMetroScore,
    getMetroPop,
    grabMetros,
    getMetroTemp,
    getMetroUnemp
} = require('../controllers/metro');

const router = express.Router();

router.get('/', metros);
router.get('/score', getMetroScores);
router.get('/score/:id', getMetroScore);
router.get('/population/:id', getMetroPop);
router.get('/unemployment/:id', getMetroUnemp);
router.get('/employment', getAllMetroEmp);
router.get('/grp', getAllMetroGrp);
router.get('/grp/:id', getMetroGrp);
router.get('/grp_total/:id', getMetroGrpTotal);
router.get('/pie/:id', getMetroPie);
router.get('/grab', grabMetros);
router.get('/temperature/:id', getMetroTemp);

module.exports = router;
const express = require('express');
const {
    addEmailToList,
    sendFeedback
} = require('../controllers/users-input');

const router = express.Router();

router.post('/email-list', addEmailToList);
router.post('/feedback', sendFeedback);

module.exports = router;
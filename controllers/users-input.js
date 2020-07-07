const db = require('../db/index');

exports.addEmailToList = async (req, res) => {
    console.log(req.body);

    res.status(200).json({ success: true });
}

exports.sendFeedback = async (req, res) => {
    console.log(req.body);

    res.status(200).json({ success: true });
}
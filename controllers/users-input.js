const db = require('../db/index');

exports.addEmailToList = async (req, res) => {
    console.log(req.body);

    const text = "INSERT INTO email_list(email) VALUES ($1)";
    const values = [req.body.email];

    await db.query(text, values);

    res.status(200).json({ success: true });
}

exports.sendFeedback = async (req, res) => {
    console.log(req.body);

    res.status(200).json({ success: true });
}
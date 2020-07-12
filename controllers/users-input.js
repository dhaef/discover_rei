const db = require('../db/index');
const sendMail = require('../utils/sendMail');

exports.addEmailToList = async (req, res) => {
    try {
        const text = "INSERT INTO email_list(email) VALUES ($1)";
        const values = [req.body.email];

        await db.query(text, values);

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, type: 'Email already exists' });
    }
}

exports.sendFeedback = async (req, res) => {
    console.log(req.body);

    let message;
    if (req.body.msg) {
        message = `<p><strong>Email:</strong> ${req.body.email}</p><p><strong>Mesage:</strong> ${req.body.msg}</p>`
    }

    try {
        await sendMail({
            from: req.body.email,
            // email: process.env.CONTACT_EMAIL,
            subject: `Feedback Message @ ${req.body.email}`,
            msg: message
        });

        res.status(200).json({ success: true, data: 'Message Sent' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, data: 'Message Failed' })
    }
}
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const message = {
        // from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        from: process.env.FROM_EMAIL,
        to: process.env.FROM_EMAIL,
        subject: options.subject,
        html: options.msg
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;
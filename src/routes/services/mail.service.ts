
import * as nodemailer from 'nodemailer';
import config = require('../../config');

const transporter = nodemailer.createTransport({
    host: config.mail.SMTP_HOST,
    port: Number(config.mail.SMTP_PORT),
    /*secure: config.NODE_ENV === 'production',*/
    socketTimeout: 5000,
    logger: true,
    auth: {
        user: config.mail.SMTP_USER,
        pass: config.mail.SMTP_PASSWORD
    }
});

export async function sendMail(options: { to: string, from: string, subject: string, text: string }) {
    const mailOptions = { from: config.mail.SMTP_USER, ...options };
    return await transporter.sendMail(mailOptions);
}

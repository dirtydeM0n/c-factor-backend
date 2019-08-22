
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.NODE_ENV === 'production',
    socketTimeout: 5000,
    logger: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

export async function sendMail(options: { to: string, from: string, subject: string, text: string }) {
    const mailOptions = { from: process.env.SMTP_USER, ...options };
    return await transporter.sendMail(mailOptions);
}

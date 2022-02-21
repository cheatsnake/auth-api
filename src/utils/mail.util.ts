import "dotenv/config";
import nodemailer from "nodemailer";

class MailUtil {
    transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Activating an account in the Auth API",
            text: "",
            html: `
                    <div>
                        <h2>To activate your account, please follow the link:</h2>
                        <a href="${link}">${link}</a>
                        <p>If you have not registered on our service, then just ignore this email.</p>
                    </div>
                `,
        });
    }
}

export default new MailUtil();

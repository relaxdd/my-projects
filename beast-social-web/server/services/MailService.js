import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      service: "mail",
      auth: {
        type: "login",
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  sendActivationLink = (to, link) => {
    const sendMail = {
      from: process.env.SMTP_USER,
      to,
      subject: "Подтверждение почты на сайте " + process.env.CLIENT_URL,
      text: "",
      html: `
          <div>
            <h1>Для подтверждение почты нажмите на кнопку ниже</h1>
            <a href="${link}">Подтвердить почту</a>
          </div>
          `,
    };
    
    try {
      this.transporter.sendMail(sendMail, function (err) {
        if (e) throw new Error(`При отправке письма произошла ошибка: ${e}`);
      });
    } catch (e) {
      throw new Error(
        `При отправке письма произошла непредвиденная ошибка: ${e}`
      );
    }
  };
}

export default new MailService();

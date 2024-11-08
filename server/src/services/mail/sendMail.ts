import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

// function to send the otp on the email address
const sendMailFN = (emailAddress: string, subject: string, text: string): void => {

    try {
        const mailOption = {
            from: process.env.MAIL_USER,
            to: emailAddress,
            subject,
            text
        }
        transporter.sendMail(mailOption, (err, info) => {

            if (err) {
                console.log("mail sending function error :", err);
                return;

            } else {
                console.log("Mail sended successfully :", info.response);
                return;
            }
        })

    } catch (error: any) {
        console.log("Sending mail function error :", error);
        return;
    }
}

export default sendMailFN
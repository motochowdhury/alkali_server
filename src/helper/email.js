// external require
const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../secret");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
    // smtp authentication
      user: smtpUserName,
      pass: smtpPassword
    }
  });

// mail sending function

const emailWithNodeMailer = async(emailData) => {
    try {
        const emailOptions = {
            from: smtpUserName, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html // html body
        }

        const info = await transporter.sendMail(emailOptions)
        console.log(info)
    } catch (error) {
        throw error;
    }
}


module.exports = emailWithNodeMailer
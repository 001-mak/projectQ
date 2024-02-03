import nodemailer from "nodemailer";


const emailService = (email, emailVerificationURL)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "ahsankhaleeq10@gmail.com",
          pass: process.env.G_PASS,
        },
      });

      transporter
        .sendMail({
          from: "ahsankhaleeq10@gmail.com",
          to: email,
          subject: "Verify Email",
          text: `This is a test email. Verify Email: ${emailVerificationURL}`,
        })
        .then((info) => {
          console.log("Email sent:", info.response);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });

}

export default emailService;
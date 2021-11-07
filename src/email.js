const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "starbreed70@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("Server error: ", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

async function sendEmail (header, msg) {
  try {
    await transporter.sendMail({
      from: '"Fred Foo 👻"', // sender address
      to: "nonseifebhor@gmail.com, predictcoinfinance@gmail.com", // list of receivers
      subject: header,
      text: msg
    });  
  }catch(err){
    console.log("Email error", err);
  }
}

module.exports = sendEmail;
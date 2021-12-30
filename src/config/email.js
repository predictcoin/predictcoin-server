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

transporter.verify(function (error) {
  if (error) {
    console.log("Server error: ", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports =  transporter;

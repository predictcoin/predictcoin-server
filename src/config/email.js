const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.com",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID,
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

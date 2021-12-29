const { transporter } = require("./config");

async function sendEmail (header, msg) {
  try {
    await transporter.sendMail({
      from: '"Fred Foo 👻"', // sender address
      to: "nonseifebhor@gmail.com", // list of receivers , predictcoinfinance@gmail.com
      subject: header,
      text: msg
    });  
  }catch(err){
    console.log("Email error", err);
  }
}

module.exports = sendEmail;
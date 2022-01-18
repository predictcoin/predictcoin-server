const { transporter } = require("./config");

async function sendEmail (header, msg) {
  try {
    await transporter.sendMail({
      from: "predictcoinfinance@gmail.com", // sender address
      to: ["nonseifebhor@gmail.com", "predictcoinfinance@gmail.com"],// list of receivers , 
      subject: header,
      text: msg
    });  
  }catch(err){
    console.log("Email error", err);
  }
}

module.exports = sendEmail;
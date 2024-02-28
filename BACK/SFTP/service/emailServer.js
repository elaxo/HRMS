const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "inpowerhr.com",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@inpowerhr.com",
    pass: "accessemailthroughserver",
  },
});


module.exports = {
   transporter
}
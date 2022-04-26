"use strict";
require('dotenv').config();
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');

async function createGmailTransporter() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  return transporter;
}

function sendMailSendGrid(data) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return sgMail.send(data);
}



// async..await is not allowed in global scope, must use a wrapper
async function sendMailNodeMailer(data) {
  const transporter = await createGmailTransporter();
  // send mail with defined transport object
  const info = await transporter.sendMail(data);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports = {
  sendMailNodeMailer,
  sendMailSendGrid,
};

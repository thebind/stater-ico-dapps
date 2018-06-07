const nodemailer = require('nodemailer');
const config = require('../../config/mailer');

const transport = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: config.MAILGUN_USER,
    pass: config.MAILGUN_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
  sendEmail(message) {
    console.log(message);
    // SendMail
    return new Promise((resolve, reject) => {
      transport.sendMail(message, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  }
};

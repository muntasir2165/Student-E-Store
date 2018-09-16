var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "student.e.store.no.reply@gmail.com",
    pass: "studentestore2018"
  }
});

var mailOptions = {
  from: "student.e.store.no.reply@gmail.com"
  // to: "muntasir2165hotmail.com",
  // subject: 'Notification from Student-E-Store',
  // html: "<h1 align=\"center\">Welcome</h1><p>That was easy!</p>"
  // text: "Sample email body."
};

module.exports = function(emailTo, emailSubject, isEmailBodyHtml, emailBody) {
  mailOptions.to = emailTo;
  mailOptions.subject = emailSubject;
  if (isEmailBodyHtml) {
    mailOptions.html = emailBody;
  } else {
    mailOptions.text = emailBody;
  }
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log("Email delivery failed.\n" + JSON.stingify(error));
    } else {
      // info object example:
      /* {
            "accepted":["muntasir2165@hotmail.com"],
            "rejected":[],
            "envelopeTime":141,
            "messageTime":400,
            "messageSize":364,
            "response":"250 2.0.0 OK 1536972559 80-v6sm266115itk.14 - gsmtp",
            "envelope":{"from":"student.e.store.no.reply@gmail.com",
            "to":["muntasir2165@hotmail.com"]},
            "messageId":"<e187370c-86ad-33e1-8f6e-d7b54e4c0eaf@gmail.com>"
            }
            */

      console.log("Email sent to: " + info.envelope.to);
    }
  });
};

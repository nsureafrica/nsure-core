//@ts-check

const mailService = require("./../Utils/mailService");
const UserModel = require("./../Models/User");
module.exports = {
  sendMailToAllUsers: (req, res) => {
    UserModel.findAll({})
      .then(users => {
        users.map(user => {
          var mailOptions = {
            from: process.env.senderEmailAdress,
            to: user.dataValues.email,
            subject: req.body.subject,
            text: req.body.message
          };
          mailService.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              const notice = `Email sent: ` + info.response;
              console.log(notice);
            }
          });
        });
        res.status(200).send({ message: "All Emails Have been sent" });
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },
  sendMailToOneUser: (req, res) => {
    UserModel.findOne({});
  },
  sendMailToUsers: (req, res) => {
    req.body.users.map(user => {
      var mailOptions = {
        from: process.env.senderEmailAdress,
        to: user.dataValues.email,
        subject: req.body.subject,
        text: req.body.message
      };
      mailService.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          const notice = `Email sent: ` + info.response;
          console.log(notice);
        }
      });
    });
    res.status(200).send({ message: "All Emails Have been sent" });
  }
};

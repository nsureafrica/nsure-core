// @ts-check

const passport = require("passport");
const jwt = require("../Utils/jwt");
const UserModel = require("../Models/User");
const bCrypt = require("bcrypt-nodejs");
const nodemailer = require("nodemailer");
const iplocate = require("node-iplocate");
const logIt = require("./../Utils/AuditLog");
require("../passport");
const passwordGenerator = require("./../Utils/passwordGenerator");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.user,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken: process.env.refreshToken,
    accessToken: process.env.accessToken,
    expires: Number.parseInt(process.env.expires, 10),
  },
});

module.exports = {
  signin: (req, res) => {
    passport.authenticate(
      "signin",
      { failureRedirect: "/signin" },
      (err, user, info) => {
        var message = info.message;
        if (!user) {
          res.status(401).send({ message, user });
        } else {
          // delete unnecessary fields
          delete user.password;
          delete user.createdAt;
          delete user.updatedAt;
          var token = jwt.sign(user);
          //log this
          const userObject = { user: user };
          Object.assign(req, userObject);
          logIt(req);
          res.status(200).send({ message, token });
        }
      }
    )(req, res);
  },
  signup: (req, res) => {
    try {
      // check if user exists
      UserModel.findOne({
        where: { email: req.body.email },
      })
        .then(async (user) => {
          if (user) {
            res.status(409).send({
              message: "Failed",
              error: "A user with that email exists",
            });
          } else {
            // hash user password
            var hashedPassword = bCrypt.hashSync(
              req.body.password,
              bCrypt.genSaltSync(8)
            );
            // create user
            var ipLocation = await iplocate(req.ip);

            UserModel.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phoneNumber: req.body.phoneNumber,
              email: req.body.email,
              country: ipLocation.country_code,
              city: ipLocation.city,
              password: hashedPassword,
              tempPassword: false,
              isVerified: true,
              UserCategoryId: 1,
            })
              .then((user) => {
                delete user.password;
                delete user.createdAt;
                delete user.updatedAt;
                res.status(200).send({ message: "Success", user: user });
                var mailOptions = {
                  from: process.env.senderEmailAdress,
                  to: `${user.email}`,
                  subject: "Account Created",
                  text: `Hello ${user.firstName} ${
                    user.lastName
                  }, Welcome to spiresure, we are glad you joined us! click on this link to verify your email ${Buffer.from(
                    `{"UserId":${user.id}}`
                  ).toString("base64")}`,
                };
                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    console.error(err);
                  } else {
                    const notice = `Email sent: ` + info.response;
                    console.log(notice);
                  }
                });
              })
              .catch((error) => {
                res
                  .status(500)
                  .send({ message: "Unable to send email", error: error });
              });
          }
        })
        .catch((error) => {
          res.status(500).send({ message: "Failed2", error: error });
        });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  forgotPassword: (req, res) => {
    const newPassword = passwordGenerator.simplePassword();
    var hashedPassword = bCrypt.hashSync(newPassword, bCrypt.genSaltSync(8));
    UserModel.update(
      { password: hashedPassword, tempPassword: true },
      { returning: true, where: { email: req.body.email } }
    )
      .then((user) => {
        console.log(user[1]);
        if (user[1] === 0) {
          res
            .status(500)
            .send({ message: "User not found", error: "User doesnt exist" });
        } else {
          UserModel.findOne({ where: { email: req.body.email } }).then(
            (user) => {
              res.status(200).send({ message: "Email sent" });
              var mailOptions = {
                from: process.env.senderEmailAdress,
                to: `${user.email}`,
                subject: "Password Reset",
                text: `Hello ${user.firstName} ${user.lastName}, Your Spiresure password has been reset. Your new password is ${newPassword}`,
              };
              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  console.log(err);
                } else {
                  const notice = `Email sent: ` + info.response;
                }
              });
            }
          );
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  //change password
  changePassword: (req, res) => {
    passport.authenticate(
      "signin",
      { failureRedirect: "/signin" },
      (err, user, info) => {
        var message = info.message;
        if (!user) {
          res.status(401).send({ message, user });
        } else {
          //update user with new password
          var hashedPassword = bCrypt.hashSync(
            req.body.newPassword,
            bCrypt.genSaltSync(8)
          );
          UserModel.update(
            { password: hashedPassword, tempPassword: false },
            { returning: true, where: { email: req.body.username } }
          )
            .then((user) => {
              console.log(user[1]);
              if (user[1] === 0) {
                res.status(500).send({
                  message: "User not found",
                  error: "User doesnt exist",
                });
              } else {
                UserModel.findOne({ where: { email: req.body.username } })
                  .then((user) => {
                    console.log(user.email);
                    var mailOptions = {
                      from: process.env.senderEmailAdress,
                      to: `${user.email}`,
                      subject: "Password Changed",
                      text: `Hello ${user.firstName} ${user.lastName}, Your Spiresure password has been changed.`,
                    };
                    transporter.sendMail(mailOptions, (err, info) => {
                      if (err) {
                        console.log(err);
                      } else {
                        const notice = `Email sent: ` + info.response;
                      }
                    });
                  })
                  .catch((err) => {
                    res.status(500).send(err);
                  });
              }
            })
            .catch((err) => {
              res.status(500).send(err);
            });
          // delete unnecessary fields

          delete user.password;
          delete user.createdAt;
          delete user.updatedAt;
          var token = jwt.sign(user);
          res.status(200).send({ message: "Email sent", token });
        }
      }
    )(req, res);
  },
  verifyUser: (req, res) => {
    try {
      const decodedString = Buffer.from(
        req.body.encodedString,
        "base64"
      ).toString();
      const userObject = JSON.parse(decodedString);

      UserModel.update(
        { isVerified: true },
        { returning: true, where: { id: userObject.UserId } }
      )
        .then((response) => res.status(200).send({ message: "User Verified" }))
        .catch((err) => {
          console.error(err);
          throw err;
        });
    } catch (error) {
      res.send(error);
    }
  },
};

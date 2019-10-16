const passport = require("passport");
const jwt = require("../jwt");
const UserModel = require("../Models/User");
const bCrypt = require("bcrypt-nodejs");
require("../passport");

// const passport = require("passport");
// require("../passport")(passport, User);

module.exports = {
  signin: (req, res) => {
    passport.authenticate(
      "signin",
      { failureRedirect: "/signin" },
      (err, user, info) => {
        message = info.message;
        if (!user) {
          res.status(401).send({ message, user });
        } else {
          // delete unnecessary fields
          delete user.password;
          delete user.createdAt;
          delete user.updatedAt;
          token = jwt.sign(user);
          res.status(200).send({ message, token });
        }
      }
    )(req, res);
  },
  signup: (req, res) => {
    // check if user exists
    UserModel.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) {
          res
            .status(409)
            .send({
              message: "Failed",
              error: "A user with that email exists"
            });
        } else {
          // hash user password
          hashedPassword = bCrypt.hashSync(
            req.body.password,
            bCrypt.genSaltSync(8),
            null
          );
          // create user
          UserModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: hashedPassword
          })
            .then(user => {
              delete user.password;
              delete user.createdAt;
              delete user.updatedAt;
              res.status(200).send({ message: "Success", user: user });
            })
            .catch(error => {
              res.status(500).send({ message: "Failed", error: error });
            });
        }
      })
      .catch(error => {
        res.status(500).send(error);
      });
  }
};

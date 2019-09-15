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
          res.send({ message, token });
        }
      }
    )(req, res);
  },
  signup: (req, res) => {
    // check if user exists
    UserModel.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) {
          res.send("A User with that email exists");
        }
        // hash user password
        hashedPassword = bCrypt.hashSync(
          req.body.password,
          bCrypt.genSaltSync(8),
          null
        );
        UserModel.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          password: hashedPassword
        });
      })
      .then(user => {
        res.send(user);
      });
    // create user if they dont
  }
  // signup: passport.authenticate('local-signup', {

  // })
};

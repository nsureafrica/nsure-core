const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("./Models/User");
const bCrypt = require("bcrypt-nodejs");
const UserCategory = require("./Models/UserCategory");

//TODO add sign in with google and facebook methods
passport.use(
  "signin",
  new LocalStrategy(function(username, password, done) {
    UserModel.findOne({
      include: [UserCategory],
      where: { email: username }
    }).then(user => {
      if (!user) {
        return done(null, null, { message: "User does not exist" });
      } else {
        // verify password
        bCrypt.compare(password, user.dataValues.password, (err, res) => {
          if (!res) {
            return done(err, null, { message: "Incorrect password" });
          }
          console.log(res);
          return done(null, user.dataValues, { message: "Successful login" });
        });
      }
    });
  })
);

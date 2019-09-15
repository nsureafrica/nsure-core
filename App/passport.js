const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("./Models/User");
const bCrypt = require("bcrypt-nodejs");

passport.use(
  "signin",
  new LocalStrategy(function(username, password, done) {
    UserModel.findOne({ where: { email: username } }).then(user => {
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

// passport.use(
//   "local-signin",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password"
//     },
//     (email, password, done) => {
//       UserModel.findOne({
//         where: {
//           email: email
//           // password: password
//         }
//       })
//         .then(user => {
//           if (!user) {
//             console.log(21);
//             return done(null, false, {
//               message: "Incorrect email or password"
//             });
//           } else {
//             console.log(26);
//             return done(null, user, {
//               message: "logged in successfully"
//             });
//           }
//         })
//         .catch(err => {
//           console.log(33);
//           console.log(err);
//           return done(err, false, { message: "Something isn't right, unable to login" });
//         });
//     }
//   )
// );

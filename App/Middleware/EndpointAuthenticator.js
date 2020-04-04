const jwt = require("./../Utils/jwt");
const lodash = require("lodash");
const endpointAuthenitcator = function(req, res, next) {
  console.log(req.url);

  //create a list of whitelisted urls
  var whitelistedUrl = [
    "/signin",
    "/forgotPassword",
    "/signup",
    "/changePassword",
    "/verifyUser"
  ];
  if (whitelistedUrl.find(element => element === req.url) == undefined) {
    var token = req.headers["x-access-token"];
    if (!token) {
      res.status(401).send({ auth: false, message: "No token provided." });
    } else {
      var user = jwt.verify(token);
      if (!user) {
        res
          .status(401)
          .send({ auth: false, message: "Invalid token provided" });
      } else {
        //add user object to the request
        const userObject = { user: user };
        Object.assign(req, userObject);
        next();
      }
    }
  } else {
    next();
  }
};

module.exports = endpointAuthenitcator;

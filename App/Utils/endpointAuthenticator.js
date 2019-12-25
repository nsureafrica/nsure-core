const jwt = require("../Utils/jwt");

module.exports = {
  authenticateUser: (req, res) => {
    var token = req.headers["x-access-token"];
    if (!token)
      res.status(401).send({ auth: false, message: "No token provided." });
    var user = jwt.verify(token);
    if (!user) {
      res.status(401).send({ auth: false, message: "Invalid token provided" });
    } else {
      return user.id;
    }
  },

  //TODO
  checkUserRole:(user,req,res)=>{}
};

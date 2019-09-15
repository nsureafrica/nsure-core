const Controller = require("../Controller/controller");

module.exports = app => {
  app.route("/").get((req, res) => {
    res.send("Welcome to bussly backend");
  });
  app.route("/signin").post(Controller.signin);
  app.route("/signup").post(Controller.signup);
};

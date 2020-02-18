//@ts-check
const chalk = require("chalk");
const Underwriter = require("../Models/underwriters");

module.exports = {
  getUnderwriter: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    Underwriter.findAll({
      where: {
        id: req.params.id
      }
    })
      .then(classes => {
        console.log(chalk.blue(classes));
        res.send(classes);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};

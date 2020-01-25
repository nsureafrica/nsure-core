//@ts-check
const endpointAuthenticator = require("../../Utils/endpointAuthenticator");
module.exports = {
  customPolicyFilter: (model, req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    model
      .findAll({
        where: req.body.customFilter
      })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};

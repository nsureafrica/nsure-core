//@ts-check
module.exports = {
  customPolicyFilter: (model, req, res) => {
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

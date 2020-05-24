//@ts-check
const ConversionRateModel = require("./../../Models/conversion_rates");
module.exports = {
  create: (req, res) => {
    ConversionRateModel.create(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};

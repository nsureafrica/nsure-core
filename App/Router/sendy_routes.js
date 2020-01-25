//@ts-check
const SendyController = require("../Controllers/sendy_controller");

module.exports = app => {
  app.route("/sendy/requestDelivery").post(SendyController.requestDelivery);

  app.route("/sendy/completeDelivery").post(SendyController.completeDelivery);

  app.route("/sendy/trackDelivery").post(SendyController.trackDelivery);

  app.route("/sendy/cancelDelivery").post(SendyController.cancelDelivery);
};

//@ts-check
const SendyController = require("../Controllers/sendy_controller");

module.exports = app => {
  app.route("/api/sendy/requestDelivery").post(SendyController.requestDelivery);

  app.route("/api/sendy/completeDelivery").post(SendyController.completeDelivery);

  app.route("/api/sendy/trackDelivery").post(SendyController.trackDelivery);

  app.route("/api/sendy/cancelDelivery").post(SendyController.cancelDelivery);
};

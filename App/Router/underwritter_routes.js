//@ts-check

const underwriterController = require("./../Controllers/underwriter_controller");

module.exports = app => {
  app.route("/underwriter/getoneunderwriter/:id").get(underwriterController.getUnderwriter);
  app.route("/underwriter/createUnderwriter").post(underwriterController.createUnderwriter);
  app.route("/underwriter/getAllUnderwriters").get(underwriterController.getAllUnderwriter)
  app.route("/underwriter/updateunderwiterbyid/:id").put(underwriterController.updateMotorRatesById)
};

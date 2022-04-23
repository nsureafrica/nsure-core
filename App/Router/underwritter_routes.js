//@ts-check

const underwriterController = require("./../Controllers/underwriter_controller");

module.exports = app => {
  app.route("/api/underwriter/getoneunderwriter/:id").get(underwriterController.getUnderwriter);
  app.route("/api/underwriter/createUnderwriter").post(underwriterController.createUnderwriter);
  app.route("/api/underwriter/getAllUnderwriters").get(underwriterController.getAllUnderwriter)
  app.route("/api/underwriter/updateunderwiterbyid/:id").put(underwriterController.updateMotorRatesById)
};

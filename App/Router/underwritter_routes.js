//@ts-check

const underwriterController = require("./../Controllers/underwriter_controller");

module.exports = app => {
  app.route("/underwriter/:id").get(underwriterController.getUnderwriter);
};

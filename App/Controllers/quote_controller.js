// @ts-check

//@ts-ignore
const MotorQuoteController = require("./QuoteControllers/motor_quote_controller");
const MedicalQuoteController = require("./QuoteControllers/medical_quote_controller");
module.exports = {
  getMotorQuote: (req,res,sequelizeResponse) => {
    MotorQuoteController.getMotorQuote(req,res,sequelizeResponse)
  },
  getMedicalQuote: (req, res) => {
    MedicalQuoteController.getMedicalQuote(req,res)
  }
};

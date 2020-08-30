// @ts-check

//@ts-ignore
const MotorQuoteController = require("./QuoteControllers/motor_quote_controller");
const MedicalQuoteController = require("./QuoteControllers/medical_quote_controller");
const IncomeProtectionQuoteController = require("./QuoteControllers/income_protection_quote_controllers");
const GolferControllers = require("./QuoteControllers/golfer_quote_controllers");
const LastExpenseQuoteController = require("./QuoteControllers/last_expense_quote_controller")
const DomesticQuoteController = require("./DomesticPolicyControllers/domestic_policy_quote_controller")
const BusinessCombinedQuoteController = require("./BusinessCombinedControllers/business_combined_quote_controller")
const TravelQuoteController = require("./../Controllers/TravelPolicyControllers/travel_quote_controller")
module.exports = {
  getMotorQuote: (req,res,sequelizeResponse) => {
    MotorQuoteController.getMotorQuote(req,res)
  },
  getMedicalQuote: (req, res) => {
    MedicalQuoteController.getMedicalQuote(req,res)
  },

  getIncomeQuote: (req, res) => {
    IncomeProtectionQuoteController.getQuote(req,res)
  },

  getGolfQuote: (req, res) => {
    GolferControllers.getGolfersQuote(req,res)
  },

  getLastExpenseQuote: (req,res) => {
    LastExpenseQuoteController.getLastExpenseQuote(req,res)
  },

  getDomesticQuote: (req,res) => {
    DomesticQuoteController.getQuote(req,res)
  },

  getBusinessCombinedQuote: (req,res) =>{
    BusinessCombinedQuoteController.getQuote(req,res)
  },
  getTravelQuote: (req,res)=>{
    TravelQuoteController.getQuote(req,res)
  }
};

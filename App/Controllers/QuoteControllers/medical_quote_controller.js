//@ts-check

//@ts-ignore
const MedicalRates = require("../../Models/medical_rates");
const transporter = require("../../Utils/mailService");
module.exports = {
  getMedicalQuote: (req, res) => {
   const planId = req.body.planId
   const age = req.body.age


   MedicalRates.findAll()
   .then(rates => {
     console.log(rates)
   })
   .catch(err => {
     console.log(err)
   })
  }
  
};

//@ts-check

const UserModel = require("./../Models/User");
const MotorPoliciesModel = require("./../Models/motor_policy");
const MedicalPolicyModel = require("./../Models/medical_policy");
const EducationPolicyModel = require("./../Models/education_policy");
const TravelPolicyModel = require("./../Models/travel_policy");
const LastExpensePolicyModel = require("./../Models/last_expense_policy");

module.exports = {
  getDashboardData: async (req, res) => {

    //counts 
    const numberofUsers =  await UserModel.count();
    const numberOfMotorPolicies = await MotorPoliciesModel.count();
    const numberOfMedicalPolicies = await MedicalPolicyModel.count();
    const numberOfEducationPolicies = await EducationPolicyModel.count();
    const numberOfTravelPolicies = await TravelPolicyModel.count();
    const numberOfLastExpensePolicies = await LastExpensePolicyModel.count();
    // const dashboardData

   //sums
   const sumOfMotorQuoteAmount = await MotorPoliciesModel.sum('quoteAmount');
//    const sumOfMedicalQuoteAmount = await MedicalPolicyModel.sum('quoteAmount');
//    const sumOfEducationQuoteAmount = await EducationPolicyModel.sum('quoteAmount');
//    const sumOfTravelQuoteAmount =  await TravelPolicyModel.sum('quoteAmount');
//    const sumOfLastExpenseQuoteAmounts = await LastExpensePolicyModel.sum('quoteAmount');
    var dashboardDataObject = {
        numberofUsers,numberOfMotorPolicies,numberOfMedicalPolicies,numberOfEducationPolicies,numberOfTravelPolicies,numberOfLastExpensePolicies,sumOfMotorQuoteAmount
      };
    console.log(dashboardDataObject)
    res.send(dashboardDataObject)
  }

};

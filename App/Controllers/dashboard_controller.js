//@ts-check

const UserModel = require("./../Models/User");
const MotorPoliciesModel = require("./../Models/motor_policy");
const MedicalPolicyModel = require("./../Models/medical_policy");
const EducationPolicyModel = require("./../Models/education_policy");
const TravelPolicyModel = require("./../Models/travel_policy");
const LastExpensePolicyModel = require("./../Models/last_expense_policy");
const sequelizeConnection = require("../DB/database").sequelizeConnection;

const Bill = require("./../Models/Bill");
module.exports = {
  getDashboardData: async (req, res) => {
    //counts
    const numberofUsers = await UserModel.count();
    const numberOfMotorPolicies = await MotorPoliciesModel.count();
    const numberOfMedicalPolicies = await MedicalPolicyModel.count();
    const numberOfEducationPolicies = await EducationPolicyModel.count();
    const numberOfTravelPolicies = await TravelPolicyModel.count();
    const numberOfLastExpensePolicies = await LastExpensePolicyModel.count();
    // const dashboardData

    //sums
    const sumOfMotorQuoteAmount = await MotorPoliciesModel.findAll({
      attributes: [
        'Bill.amount',
        [sequelizeConnection.fn('sum', sequelizeConnection.col('Bill.amount')), 'total_amount'],
      ],
      group: ['Bill.amount'],
      include: ['Bill']
    });
    console.info(sumOfMotorQuoteAmount)
    //    const sumOfMedicalQuoteAmount = await MedicalPolicyModel.sum('quoteAmount');
    //    const sumOfEducationQuoteAmount = await EducationPolicyModel.sum('quoteAmount');
    //    const sumOfTravelQuoteAmount =  await TravelPolicyModel.sum('quoteAmount');
    //    const sumOfLastExpenseQuoteAmounts = await LastExpensePolicyModel.sum('quoteAmount');
    var dashboardDataObject = {
      numberofUsers,
      numberOfMotorPolicies,
      numberOfMedicalPolicies,
      numberOfEducationPolicies,
      numberOfTravelPolicies,
      numberOfLastExpensePolicies
    };
    console.log(dashboardDataObject);
    res.send(dashboardDataObject);
  }
};

//@ts-check

const UserModel = require("./../Models/User");
const MotorPoliciesModel = require("./../Models/motor_policy");
const MedicalPolicyModel = require("./../Models/medical_policy");
const EducationPolicyModel = require("./../Models/education_policy");
const TravelPolicyModel = require("./../Models/travel_policy");
const LastExpensePolicyModel = require("./../Models/last_expense_policy");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const { QueryTypes } = require("sequelize");

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

    const sumOfMotorQuoteAmount = await sequelizeConnection.query(
      "SELECT SUM(two.Bills.amount) as total_amount FROM two.MotorPolicies INNER JOIN two.Bills ON two.Bills.id = BillId;",
      { type: QueryTypes.SELECT }
    );

    const sumOfMedicalQuoteAmount = await sequelizeConnection.query(
      "SELECT SUM(two.Bills.amount) as total_amount FROM two.MedicalPolicies INNER JOIN two.Bills ON two.Bills.id = BillId;",
      { type: QueryTypes.SELECT }
    );
    const sumOfEducationQuoteAmount = await sequelizeConnection.query(
      "SELECT SUM(two.Bills.amount) as total_amount FROM two.EducationPolicies INNER JOIN two.Bills ON two.Bills.id = BillId;",
      { type: QueryTypes.SELECT }
    );
    const sumOfTravelQuoteAmount = await sequelizeConnection.query(
      "SELECT SUM(two.Bills.amount) as total_amount FROM two.TravelPolicies INNER JOIN two.Bills ON two.Bills.id = BillId;",
      { type: QueryTypes.SELECT }
    );
    const sumOfLastExpenseQuoteAmounts = await sequelizeConnection.query(
      "SELECT SUM(two.Bills.amount) as total_amount FROM two.LastExpensePolicies INNER JOIN two.Bills ON two.Bills.id = BillId;",
      { type: QueryTypes.SELECT }
    );

    var dashboardDataObject = {
      numberofUsers,
      numberOfMotorPolicies,
      numberOfMedicalPolicies,
      numberOfEducationPolicies,
      numberOfTravelPolicies,
      numberOfLastExpensePolicies,
      sumOfMotorQuoteAmount,
      sumOfMedicalQuoteAmount,
      sumOfEducationQuoteAmount,
      sumOfTravelQuoteAmount,
      sumOfLastExpenseQuoteAmounts
    };
    console.log(dashboardDataObject);
    res.send(dashboardDataObject);
  }
};

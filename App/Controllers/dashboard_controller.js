//@ts-check

const UserModel = require("./../Models/User");
const MotorPoliciesModel = require("./../Models/motor_policy");
const MedicalPolicyModel = require("./../Models/medical_policy");
const EducationPolicyModel = require("./../Models/education_policy");
const TravelPolicyModel = require("./../Models/travel_policy");
const LastExpensePolicyModel = require("./../Models/last_expense_policy");
const sequelizeConnection = require("../DB/database").sequelizeConnection;
const { QueryTypes, Op } = require("sequelize");

const Bill = require("./../Models/Bill");
module.exports = {
  getDashboardData: async (req, res) => {
    try {
      // const dashboardData

      //sums
      //check for date
      var startDate = "1971-10-05T14:48:00.000Z";
      var endDate = new Date().toISOString();
      //startDate
      if (req.query.startDate) {
        startDate = req.query.startDate;
      }
      //endDate
      if (req.query.endDate) {
        endDate = req.query.endDate;
      }

      var dateQuery = {
        createdAt: {
          [Op.between]: [req.query.startDate, req.query.endDate],
        },
      };

      //counts
      const numberofUsers = await UserModel.count({ where: dateQuery });
      const numberOfMotorPolicies = await MotorPoliciesModel.count({
        where: dateQuery,
      });
      const numberOfMedicalPolicies = await MedicalPolicyModel.count({
        where: dateQuery,
      });
      const numberOfEducationPolicies = await EducationPolicyModel.count({
        where: dateQuery,
      });
      const numberOfTravelPolicies = await TravelPolicyModel.count({
        where: dateQuery,
      });
      const numberOfLastExpensePolicies = await LastExpensePolicyModel.count({
        where: dateQuery,
      });

      const sumOfMotorQuoteAmount = await sequelizeConnection.query(
        "SELECT SUM(Bills.amount) as total_amount FROM MotorPolicies INNER JOIN Bills ON Bills.id = BillId WHERE MotorPolicies.createdAt BETWEEN :startDate AND :endDate ",
        {
          type: QueryTypes.SELECT,
          replacements: { startDate: startDate, endDate: endDate },
        }
      );

      const sumOfMedicalQuoteAmount = await sequelizeConnection.query(
        "SELECT SUM(Bills.amount) as total_amount FROM MedicalPolicies INNER JOIN Bills ON Bills.id = BillId WHERE MedicalPolicies.createdAt BETWEEN :startDate AND :endDate",
        {
          replacements: { startDate: startDate, endDate: endDate },

          type: QueryTypes.SELECT,
        }
      );
      const sumOfEducationQuoteAmount = await sequelizeConnection.query(
        "SELECT SUM(Bills.amount) as total_amount FROM EducationPolicies INNER JOIN Bills ON Bills.id = BillId WHERE EducationPolicies.createdAt BETWEEN :startDate AND :endDate",
        {
          replacements: { startDate: startDate, endDate: endDate },

          type: QueryTypes.SELECT,
        }
      );
      const sumOfTravelQuoteAmount = await sequelizeConnection.query(
        "SELECT SUM(Bills.amount) as total_amount FROM TravelPolicies INNER JOIN Bills ON Bills.id = BillId WHERE TravelPolicies.createdAt BETWEEN :startDate AND :endDate",
        {
          replacements: { startDate: startDate, endDate: endDate },
          type: QueryTypes.SELECT,
        }
      );
      const sumOfLastExpenseQuoteAmounts = await sequelizeConnection.query(
        "SELECT SUM(Bills.amount) as total_amount FROM LastExpensePolicies INNER JOIN Bills ON Bills.id = BillId WHERE LastExpensePolicies.createdAt BETWEEN :startDate AND :endDate",
        {
          replacements: { startDate: startDate, endDate: endDate },
          type: QueryTypes.SELECT,
        }
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
        sumOfLastExpenseQuoteAmounts,
      };
      console.log(dashboardDataObject);
      res.send(dashboardDataObject);
    } catch (error) {
      res.send(error);
    }
  },
};

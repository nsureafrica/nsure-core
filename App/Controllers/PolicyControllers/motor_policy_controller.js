// @ts-check
const MotorPolicy = require("../../Models/motor_policy");
const Bill = require("./../../Models/Bill");
const CustomFilter = require("./custom_filter_policy_controller");
module.exports = {
  getAllMotorPolicies: (req, res) => {
    MotorPolicy.findAll({
      order: [['updatedAt', 'DESC']],
    })
      .then(policies => {
        res.status(200).send(policies);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getUserMotorPolicies: (req, res) => {
    MotorPolicy.findAll({
      where: {
        emailAddress: req.user.id
      }
    })
      .then(policies => {
        res.status(200).send(policies);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getMotorPolicy: (req, res) => {
    MotorPolicy.findOne({
      where: {
        id: req.params.policyId
      }
    })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  createMotorPolicy: (req, res) => {
    var logbookPathArray = [];
    var kraFilesArray = [];
    var nationalIDArray = [];
    req.files.kraPin.forEach(fileName => {
      kraFilesArray.push(fileName.filenwa)
    })
    req.files.logbook.forEach(fileName => {
      logbookPathArray.push(fileName.filename);
    });
    req.files.nationalID.forEach(fileName => {
      nationalIDArray.push(fileName.filename)
    })
    //create a bill
    Bill.create({
      amount: req.body.quoteAmount
    })
      .then(billResponse => {
        MotorPolicy.create({
          vehicleEstimatedValue: req.body.vehicleEstimatedValue,
          vehicleModelAndMake: req.body.vehicleModelAndMake,
          vehicleType: req.body.vehicleType,
          coverType: req.body.coverType,
          courtesyCarOption: req.body.courtesyCarOption,
          registrationNumber: req.body.registrationNumber,
          chasisNumber: req.body.chasisNumber,
          engineNumber: req.body.engineNumber,
          logbookPath: logbookPathArray.toString(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          UserId: req.user.id,
          city: req.body.city,
          country: req.body.country,
          postalCode: req.body.postalCode,
          paid: req.body.paid,
          paidAmount: req.body.paidAmount,
          yearOfManufacture: req.body.yearOfManufacture,
          numberOfSeats: req.body.numberOfSeats,
          engineCapacity: req.body.engineCapacity,
          kraPin: kraFilesArray.toString(),
          quoteAmount: req.body.quoteAmount,
          idNumber: nationalIDArray.toString(),
          UnderwriterId: req.body.underWriter,
          VehicleClassId: req.body.vehicleClass,
          BillId: billResponse.dataValues.id
        }).then(sequelizeResponse => {
          //Generate quote here
          res.status(200).send(sequelizeResponse);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  //custom filter
  customFilterMotorPolicy: (req, res) =>
    CustomFilter.customPolicyFilter(MotorPolicy, req, res)
};

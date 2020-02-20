//@ts-check

const Transporter = require("../../Utils/mailService");
const MotorRates = require("./../../Models/motor_rates");
const UnderwriterModel = require("../../Models/underwriters");
const chalk =require('chalk');

const senderEmailAdress = process.env.senderEmailAdress
//get motor rates model
module.exports = {
  getMotorQuote: (req, res) => {
    var classId = req.body.classId;
    var vehicleType = req.body.vehicleType;
    var coverType = req.body.coverType;
    var estimatedCarValue = req.body.estimatedCarValue;
    var roadsideAssistance = req.body.roadsideAssistance;
    var courtesyCar = req.body.courtesyCar;
    var politicalViolenceTerrorism = req.body.politicalViolenceTerrorism;
    var excessProtector = req.body.excessProtector;
    var noOfSeats = req.body.noOfSeats
    var natureOfGoods;
    if (req.body.natureOfGoods == "") {
      natureOfGoods = null;
    } else {
      natureOfGoods = req.body.natureOfGoods;
    }

    MotorRates.findAll({
      order: [["UnderwriterId", "ASC"]],
      include: [UnderwriterModel],
      where: {
        VehicleClassId: classId,
        vehicleType: vehicleType,
        coverType: coverType,
        natureOfGoods: natureOfGoods
      }
    })
      .then(rates => {
        var quoteObjectsArray = [];
        rates.map(rate => {
          if (coverType == "thirdParty") {
            var quoteAmount = rate.minimumPremium;
            var quoteObject = {
              quoteAmount: quoteAmount,
              basic: 0,
              excessProtector: 0,
              politicalViolenceTerrorism: 0,
              passengerLegalLiability: 0,
              roadsideAssistance: 0,
              courtesyCar: 0,
              underwriter: rate.Underwriter,

            };
            quoteObjectsArray.push(quoteObject);
          } else {
            //calculate basic
            var basicAmount = 0
            var tempAmount = (estimatedCarValue * rate.basic) / 100;
            if (tempAmount < rate.minimumPremium) {
              basicAmount = rate.minimumPremium;
            } else {
              basicAmount = tempAmount;
            }
            //calculate excessProtector
            var excessProtectorAmount = 0;
            if (excessProtector) {
                tempAmount = (estimatedCarValue * rate.excessProtector) / 100;
              if (tempAmount < rate.minimumExcess) {
                excessProtectorAmount = rate.minimumExcess;
              } else {
                excessProtectorAmount = tempAmount;
              }
            }
            //calculate PLT
            var politicalViolenceTerrorismAmount = 0;
            if (politicalViolenceTerrorism) {
              tempAmount =
                (estimatedCarValue * rate.politicalViolenceTerrorism) / 100;
              if (tempAmount < rate.minimumPremium) {
                politicalViolenceTerrorismAmount =
                  rate.minimumPoliticalViolenceTerrorism;
              } else {
                politicalViolenceTerrorismAmount = tempAmount;
              }
            }
            //calculate pll
            var passengerLegalLiability = passengerLegalLiability * noOfSeats
            //Assign Roadside  Asssistance
            var roadsideAssistanceAmount = 0;
            if (roadsideAssistance) {
              roadsideAssistanceAmount = rate.roadsideAssistance;
            }
            //Courtesy Car
            var courtesyCarAmount = 0;
            if (courtesyCar) {
              courtesyCarAmount = rate.courtesyCar;
            }

            quoteAmount = courtesyCarAmount + roadsideAssistanceAmount + politicalViolenceTerrorismAmount + excessProtectorAmount + basicAmount
            var quoteObject = {
              quoteAmount: quoteAmount,
              basic: basicAmount,
              excessProtector: excessProtectorAmount,
              politicalViolenceTerrorism: politicalViolenceTerrorismAmount,
              passengerLegalLiability: 0,
              roadsideAssistance: roadsideAssistanceAmount,
              courtesyCar: courtesyCarAmount,
              underwriter: rate.Underwriter,
            };
            quoteObjectsArray.push(quoteObject);

          }
        });
        res.send(quoteObjectsArray);
        var mailOptions = {
          from: senderEmailAdress,
          to: "allanmageto@yopmail.com",
          subject: "Motor Insurance Quote",
          html: `<b>Dear Customer,</b><br/><p>Your quote breakdown is as follows</p><p><b>Selected Options:</b></p>${JSON.stringify(
            req.body
          )}<p><b>Quote</b></p>${JSON.stringify(quoteObjectsArray)}`
        };
        Transporter.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            //TODO save all failed mails to a certain table to be able to run a cron job hourly that resends all the mails
            console.log(err);
          } else {
            const notice = `Email sent: ` + info.response;
            console.log(notice);
          }
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};

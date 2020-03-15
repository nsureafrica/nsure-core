//@ts-check

const Transporter = require("../../Utils/mailService");
const MotorRates = require("./../../Models/motor_rates");
const UnderwriterModel = require("../../Models/underwriters");

const senderEmailAdress = process.env.senderEmailAdress
//get motor rates model

//Should create a different function for calculating add ons as the code is getting too long
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
    var natureOfGoods = req.body.natureOfGoods;
    if (req.body.natureOfGoods === "") {
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
            //Roadside Assistance
            var roadsideAssistanceAmount = 0;
            if (roadsideAssistance) {
              roadsideAssistanceAmount = rate.roadsideAssistance;
            }
            //Courtesy Car
            var courtesyCarAmount = 0;
            if (courtesyCar) {
              courtesyCarAmount = rate.courtesyCar;
            }

            var quoteAmount =  rate.minimumPremium + courtesyCarAmount + roadsideAssistanceAmount + politicalViolenceTerrorismAmount + excessProtectorAmount + basicAmount
            var levies = quoteAmount * (levies/100)
            quoteAmount = quoteAmount + levies + rate.stampDuty;
            var quoteObject = {
              quoteAmount: quoteAmount,
              basic: basicAmount,
              excessProtector: excessProtectorAmount,
              politicalViolenceTerrorism: politicalViolenceTerrorismAmount,
              passengerLegalLiability: 0,
              roadsideAssistance: roadsideAssistanceAmount,
              levies:levies,
              stampDuty:rate.stampDuty,
              courtesyCar: courtesyCarAmount,
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
            var passengerLegalLiability = rate.passengerLegalLiability * noOfSeats

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
            var levies = quoteAmount * (rate.levies/100)
            quoteAmount = quoteAmount + levies + rate.stampDuty
            var quoteObject = {
              quoteAmount: quoteAmount,
              basic: basicAmount,
              excessProtector: excessProtectorAmount,
              politicalViolenceTerrorism: politicalViolenceTerrorismAmount,
              passengerLegalLiability: passengerLegalLiability,
              roadsideAssistance: roadsideAssistanceAmount,
              levies:levies,
              stampDuty:rate.stampDuty,
              courtesyCar: courtesyCarAmount,
              underwriter: rate.Underwriter,
            };
            quoteObjectsArray.push(quoteObject);

          }
        });
        res.send(quoteObjectsArray);
        var mailOptions = {
          from: senderEmailAdress,
          to: req.user.email,
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

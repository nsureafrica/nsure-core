//@ts-check

const Transporter = require("../../Utils/mailService")
//@ts-ignore
const MotorRates = require("../../Rates/motor_rates.json")
module.exports = {
    getMotorQuote: (req, res ,sequelizeResponse) => {
        // var userID = endpointAuthenticator.authenticateUser(req, res);
        // console.log(userID);
        var quote = [];
        // console.log(MotorRates);
        for (var i = 0; i < MotorRates.rates.length; i++) {
          const rates = MotorRates.rates[i];
          var quoteObj = {
            policyId:sequelizeResponse.dataValues.id,
            companyName: MotorRates.rates[i].companyName,
            amount: Math.floor(Math.random() * 100000)
          };
          // console.log(MotorRates.rates[i].companyName);
          switch (req.body.coverType.toLowerCase()) {
            case "comprehensive":
              switch (req.body.category.toLowerCase()) {
                case "motorcycle":
                  quoteObj.amount = rates.motorcycles.comprehensive;
                  break;
                case "private":
                  quoteObj.amount =
                    (rates.motorPrivate.comprehensive *
                      req.body.vehicleEstimatedValue) /
                    100;
                  break;
                case "commercial":
                  quoteObj.amount =
                    (rates.motorCommercial.comprehensive *
                      req.body.vehicleEstimatedValue) /
                    100;
                  break;
                case "heavymachinery":
                  quoteObj.amount =
                    (rates.heavyMachinery.comprehensive *
                      req.body.vehicleEstimatedValue) /
                    100;
                  break;
                case "tankers":
                  quoteObj.amount =
                    (rates.tankers.comprehensive * req.body.vehicleEstimatedValue) /
                    100;
                  break;
                case "pmo":
                  quoteObj.amount =
                    (rates.PMO.comprehensive * req.body.vehicleEstimatedValue) /
                    100;
                  break;
                case "specialtypes":
                  quoteObj.amount =
                    (rates.specialTypes.comprehensive *
                      req.body.vehicleEstimatedValue) /
                    100;
                  break;
                case "psv":
                  quoteObj.amount =
                    (rates.PSV.comprehensive * req.body.vehicleEstimatedValue) /
                    100;
                  break;
                case "drivingschools":
                  quoteObj.amount =
                    (rates.drivingSchools.comprehensive *
                      req.body.vehicleEstimatedValue) /
                    100;
                  break;
              }
              break;
            case "thirdparty":
              switch (req.body.category.toLowerCase()) {
                case "motorcycle":
                  quoteObj.amount = rates.motorcycles.thirdParty;
                  break;
                case "private":
                  quoteObj.amount = rates.motorPrivate.thirdParty;
                  break;
                case "commercial":
                  quoteObj.amount = rates.motorCommercial.thirdParty;
                  break;
                case "heavyMachinery":
                  quoteObj.amount = rates.heavyMachinery.thirdParty;
                  break;
                case "tankers":
                  quoteObj.amount = rates.tankers.thirdParty;
                  break;
                case "PMO":
                  quoteObj.amount = rates.PMO.thirdParty;
                  break;
                case "specialTypes":
                  quoteObj.amount = rates.specialTypes.thirdParty;
                  break;
                case "PSV":
                  quoteObj.amount = rates.PSV.thirdParty;
                  break;
                case "drivingSchools":
                  quoteObj.amount = rates.drivingSchools.thirdParty;
                  break;
              }
              break;
          }
          quote.push(quoteObj);
        }
        // send email to user if logged in
        var mailOptions = {
          from: "technical@nsureafrica.com",
          to: req.body.emailAddress,
          subject: "Motor Insurance Quote",
          html: `<b>Dear Customer,</b><br/><p>Your quote breakdown is as follows</p><p><b>Selected Options:</b></p>${JSON.stringify(
            req.body
          )}<p><b>Quote</b></p>${JSON.stringify(quote)}`
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
        res.status(200).send(quote);
      }
}
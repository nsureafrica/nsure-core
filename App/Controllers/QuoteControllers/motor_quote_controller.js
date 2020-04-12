//@ts-check

const Transporter = require("../../Utils/mailService");
const MotorRates = require("./../../Models/motor_rates");
const UnderwriterModel = require("../../Models/underwriters");
const invoiceTemplates = require("../../email_templates/invoicetemplate");
const motorQuotePdf = require("../../email_templates/motor_quote_pdf");

const senderEmailAdress = process.env.senderEmailAdress;
//get motor rates model

//Should create a different function for calculating add ons as the code is getting too long

async function calculateExcess(excessProtector, estimatedCarValue, rate) {
  if (excessProtector) {
    var excessProtectorAmount =
      (estimatedCarValue * rate.excessProtector) / 100;
    if (excessProtectorAmount < rate.minimumExcess) {
      return rate.minimumExcess;
    } else {
      return excessProtectorAmount;
    }
  } else {
    return 0;
  }
}

async function calculatePLT(
  politicalViolenceTerrorism,
  estimatedCarValue,
  rate
) {
  if (politicalViolenceTerrorism) {
    var politicalViolenceTerrorismAmount =
      (estimatedCarValue * rate.politicalViolenceTerrorism) / 100;
    if (politicalViolenceTerrorismAmount < rate.minimumPremium) {
       return rate.minimumPoliticalViolenceTerrorism;
    } else {
      return politicalViolenceTerrorismAmount;
    }
  } else {
    return 0;
  }
}

//Calculate PLL

async function calculatePLL(vehicleType, rate, noOfSeats) {
  if (vehicleType == "commercial") {
    return rate.passengerLegalLiability * noOfSeats;
  } else {
    return 0;
  }
}

//Calculate Roadside Assistance
async function calculateRoadsideAssistance(roadsideAssistance, rate) {
  if (roadsideAssistance) {
    return rate.roadsideAssistance;
  } else {
    return 0;
  }
}

//calculate courtesy car
async function calculateCourtesyCar(courtesyCar, rate) {
  if (courtesyCar) {
    return rate.courtesyCar;
  } else {
    return 0;
  }
}
async function calculateTonnage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2000);
    }, 2000);
  });
}

// calculate basic amount
async function calculateBasicAmount(estimatedCarValue, rate) {
  var basicAmount = (estimatedCarValue * rate.basic) / 100;
  if (basicAmount < rate.minimumPremium) {
    return rate.minimumPremium;
  } else {
    return basicAmount;
  }
}
async function sendMail(req, res, quoteObjectsArray) {
  var motorQuoteEmailJson = {};
  const planDetails = { motorRates: quoteObjectsArray };
  const userDetails = { user: req.user };
  const userInput = { userInput: req.body };
  Object.assign(motorQuoteEmailJson, planDetails);
  Object.assign(motorQuoteEmailJson, userDetails);
  Object.assign(motorQuoteEmailJson, userInput);
  const policyPdfDirectory =
    "./documentsStorage/PolicyPdf/" + Date.now() + ".pdf";
  await motorQuotePdf.createInvoice(motorQuoteEmailJson, policyPdfDirectory);

  var mailOptions = {
    from: senderEmailAdress,
    to: req.user.email,
    cc: process.env.spireReceivingEmailAddress,
    subject: "Motor Insurance Quote",
    html: invoiceTemplates.invoiceQuoteEmail(req),
    attachments: [
      {
        // file on disk as an attachment
        filename: "motorquote.pdf",
        path: policyPdfDirectory, // stream this file
      },
    ],
  };
  // console.log(motorQuoteEmailJson);
  Transporter.transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      //TODO save all failed mails to a certain table to be able to run a cron job hourly that resends all the mails
      console.log(err);
    } else {
      const notice = `Email sent: ` + info.response;
      console.log(notice);
    }
  });
}
module.exports = {
  getMotorQuote: async (req, res) => {
    var classId = req.body.classId;
    var vehicleType = req.body.vehicleType;
    var coverType = req.body.coverType;
    var estimatedCarValue = req.body.estimatedCarValue;
    var roadsideAssistance = req.body.roadsideAssistance;
    var courtesyCar = req.body.courtesyCar;
    var politicalViolenceTerrorism = req.body.politicalViolenceTerrorism;
    var excessProtector = req.body.excessProtector;
    var noOfSeats = req.body.noOfSeats;
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
        natureOfGoods: natureOfGoods,
      },
    })
      .then(async (rates) => {
        var quoteObjectsArray = [];
        await rates.map(async (rate) => {
          //calculate basic
          var basicAmount = await calculateBasicAmount(estimatedCarValue, rate);
          //calculate excessProtector
          var excessProtectorAmount = await calculateExcess(
            excessProtector,
            estimatedCarValue,
            rate
          );
          //calculate PLT
          var politicalViolenceTerrorismAmount = await calculatePLT(
            politicalViolenceTerrorism,
            estimatedCarValue,
            rate
          );
          //calculate pll
          var passengerLegalLiability = await calculatePLL(
            vehicleType,
            rate,
            noOfSeats
          );
          //Assign Roadside  Asssistance
          var roadsideAssistanceAmount = await calculateRoadsideAssistance(
            roadsideAssistance,
            rate
          );
          //Courtesy Car
          var courtesyCarAmount = await calculateCourtesyCar(courtesyCar, rate);
          //calculate tonnage
          const tonnageAmount = await calculateTonnage();
          console.log(tonnageAmount);
          var quoteAmount =
            courtesyCarAmount +
            roadsideAssistanceAmount +
            politicalViolenceTerrorismAmount +
            excessProtectorAmount +
            basicAmount +
            passengerLegalLiability;
          var levies = quoteAmount * (rate.levies / 100);
          quoteAmount = quoteAmount + levies + rate.stampDuty;
          var quoteObject = {
            quoteAmount: quoteAmount,
            basic: basicAmount,
            excessProtector: excessProtectorAmount,
            politicalViolenceTerrorism: politicalViolenceTerrorismAmount,
            passengerLegalLiability: passengerLegalLiability,
            roadsideAssistance: roadsideAssistanceAmount,
            levies: levies,
            stampDuty: rate.stampDuty,
            courtesyCar: courtesyCarAmount,
            underwriter: rate.Underwriter,
          };
          quoteObjectsArray.push(quoteObject);
        });
        console.log(quoteObjectsArray)
        res.send(quoteObjectsArray);
        sendMail(req, res, quoteObjectsArray);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};

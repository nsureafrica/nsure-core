//@ts-check
const fs = require("fs");
const PDFDocument = require("pdfkit");
const moment = require("moment");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateQuoteDetails(doc, invoice);
  generatePlanDetails(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("./App/email_templates/images/logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(15)
    .text("SPIRE INSURANCE BROKERS", 50, 90)
    .fontSize(10)
    .text("Mwalimu Towers, Hill Lane, Upper Hill", 200, 50, { align: "right" })
    .text("P.O. Box 52467 – 00200, Nairobi", 200, 65, { align: "right" })
    .text("Phone: +254(20) 4981777", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Business Combined Quote", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(
      invoice.user.firstName + " " + invoice.user.lastName,
      50,
      customerInformationTop
    )
    .font("Helvetica")
    .text(invoice.user.phoneNumber, 50, customerInformationTop + 15)
    .text(invoice.user.email, 50, customerInformationTop + 30)
    .moveDown();

  // generateHr(doc, 252);
}
function generateTableRow(doc, y, item, value) {
  doc.font("Helvetica").fontSize(10).text(item, 50, y).text(value, 300, y);
}

function generateTableRowHeaderTwo(doc, y, item, value) {
  doc.fontSize(15);
  doc.font("Helvetica").text(item, 50, y).text(value, 300, y);
  doc.fontSize(10);
}

function generateQuoteDetails(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("User Input", 50, 280);
  doc.fontSize(10);
  generateHr(doc, 305);
  var userInput = [
    {
      label: "Fire And Perils Buildings Value",
      value: invoice.userInput.fireAndPerilsBuildingsValue,
    },
    {
      label: "Fire and Perils Contents Value",
      value: invoice.userInput.fireAndPerilsContentsValue,
    },
    {
      label: "Electronic Computers Value",
      value: invoice.userInput.electronicComputersValue,
    },
    {
      label: "All Risks For Computers Value",
      value: invoice.userInput.allRisksForComputersValue,
    },
    { label: "Cashiers Value", value: invoice.userInput.cashiersValue },
    { label: "Sales Person Value", value: invoice.userInput.salesPersonValue },
    { label: "Per Capita Value", value: invoice.userInput.perCapitaValue },
    {
      label: "Money In Transit Value",
      value: invoice.userInput.moneyInTransitValue,
    },
    {
      label: "Locked Safe Business Hours Value",
      value: invoice.userInput.lockedSafeBusinessHoursValue,
    },
    {
      label: "Locked Safe Outside Safe Business Hours Value",
      value: invoice.userInput.lockedSafeOutsideSafeBusinessHoursValue,
    },
    { label: "Cash Value", value: invoice.userInput.cashValue },
    {
      label: "Damage To Safe Value",
      value: invoice.userInput.damageToSafeValue,
    },
    {
      label: "Estimated Annual Carry Value",
      value: invoice.userInput.estAnnualCarryValue,
    },
    {
      label: "Material Damage Value",
      value: invoice.userInput.materialDamageValue,
    },
    { label: "Money Value", value: invoice.userInput.moneyValue },
    {
      label: "Burglary Items Value",
      value: invoice.userInput.burglaryItemsValue,
    },
    { label: "Occurrence Value", value: invoice.userInput.occurrenceValue },
    {
      label: "Period Of Insurance Value",
      value: invoice.userInput.periodOfInsuranceValue,
    },
  ];

  const planDetailsTop = 320;

  var i;
  for (i = 0; i < userInput.length; i++) {
    if (userInput[i].value != null) {
      doc.text(userInput[i].label, 50, planDetailsTop + 20 * i);
      doc.text(
        formatCurrency(userInput[i].value, invoice),
        300,
        planDetailsTop + 20 * i
      );
    }
  }
  doc.moveDown();
}

function generatePlanDetails(doc, invoice) {
  doc.addPage();
  var planDetailsTop = 50;
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Plan Details", 50, planDetailsTop);

  planDetailsTop = planDetailsTop + 30;
  doc.font("Helvetica-Bold");
  generateTableRowHeaderTwo(doc, planDetailsTop, "Cover", "Value");
  generateHr(doc, planDetailsTop + 20);
  planDetailsTop = planDetailsTop + 30;

  planDetailsTop + doc.fontSize(11).font("Helvetica");

  var meh = [
    { label: "Medical Expenses :", value: invoice.medicalExpenses },
    { label: "Medical Repatriation :", value: invoice.medicalRepatriation },
    { label: "Child Repatriation:", value: invoice.childRepatriation },
    { label: "Relatives Repatriation :", value: invoice.relativesRepatriation },
    { label: "Body Repatriation :", value: invoice.bodyRepatriation },
    { label: "Optical Emergency Care :", value: invoice.opticalEmergencyCare },
    { label: "Dental Emergency Care :", value: invoice.dentalEmergencyCare },
    { label: "Follow Up Treatment :", value: invoice.followUpTreatment },
    {
      label: "Premature Return In Case Of Death :",
      value: invoice.prematureReturnInCaseOfDeath,
    },
    { label: "Advance Of Bail :", value: invoice.advanceOfBail },
    { label: "Legal Assistance:", value: invoice.legalAssistance },
    {
      label: "Loss Or Theft Unregistered Luggage :",
      value: invoice.lossOrTheftUnregisteredLuggage,
    },
    {
      label: "Loss Or Theft Registered Luggage: :",
      value: invoice.lossOrTheftRegisteredLuggage,
    },
    { label: "Luggage Delay :", value: invoice.luggageDelay },
    { label: "Travel Delay :", value: invoice.travelDelay },
    {
      label: "Personal Civil Liability :",
      value: invoice.personalCivilLiability,
    },
    {
      label: "Hijack In Means Of Public Transport :",
      value: invoice.hijackInMeansOfPublicTransport,
    },
    { label: "Journey Cancelation :", value: invoice.journeyCancelation },
    { label: "Journey Curtailment :", value: invoice.journeyCurtailment },
    {
      label: "Missed Travel Connection :",
      value: invoice.missedTravelConnection,
    },
  ];
  var meh2 = {
    quoteAmount: null,
    fireAndPerils: {
      basicPremium: null,
      levies: null,
      stampDuty: 40,
      totalValue: null,
    },
    electronicComputersPolicy: {
      basicPremium: 1846.845,
      levies: 8.31,
      stampDuty: 40,
      totalValue: 1895.155,
    },
    allRisksForComputers: {
      basicPremium: 3514.8599999999997,
      levies: 15.82,
      stampDuty: 40,
      totalValue: 3570.68,
    },
    fidelityGuarantee: {
      basicPremium: null,
      levies: null,
      stampDuty: 40,
      totalValue: null,
    },
    money: {
      basicPremium: null,
      levies: null,
      stampDuty: 40,
      totalValue: null,
    },
    policalAndTerrorism: {
      basicPremium: null,
      levies: null,
      stampDuty: 40,
      totalValue: null,
    },
    burglary: {
      basicPremium: 61561.56,
      levies: 277.03,
      stampDuty: 40,
      totalValue: 61878.59,
    },
    publicLiability: {
      basicPremium: null,
      levies: null,
      stampDuty: 40,
      totalValue: null,
    },
  };

  var i;
  // for (i = 0; i < meh.length; i++) {
  //   if (meh[i].value != null) {
  //     doc.text(meh[i].label, 50, planDetailsTop + 20 * i);
  //     doc.text(
  //       formatCurrency(meh[i].value, invoice),
  //       300,
  //       planDetailsTop + 20 * i
  //     );
  //   }
  // }

  var risks = Object.entries(meh2);
  // risks.map((risk) => {
  //   if (risk != null) {
  //     doc.text(risk[0], 50, planDetailsTop + 20 * i);
  //     if (risk[1] != null) {
  //       console.log(risk[1])
  //       var k = Object.entries(risk[1]);
  //       k.map((l) => {
  //         console.log(l);
  //       });
  //     }
  //   }
  // });
  console.log();
  
// risks = risks.splice(i, 0)
delete risks[0]
  for (i = 1; i < risks.length; i++) {
    //first huge mini heading
   doc.text(risks[i][0], 50, (planDetailsTop + 20 )* i);
    var g = risks[i][1];
    if (g != null) {
      doc.text("Basic Premium", 50, (planDetailsTop + 40) * i);
      doc.text(
        formatCurrency(g.basicPremium, invoice),
        300,
        planDetailsTop + 40 * i
      );
      doc.text("Levies", 50, (planDetailsTop + 60) * i);

      doc.text(formatCurrency(g.levies, invoice), 300, (planDetailsTop + 60) * i);

      doc.text("Stamp Duty", 50, (planDetailsTop + 80) * i);

      doc.text(
        formatCurrency(g.stampDuty, invoice),
        300,
        (planDetailsTop + 80) * i
      );
      doc.text("Total Value", 50, planDetailsTop + 100 * i);

      doc.text(
        formatCurrency(g.totalValue, invoice),
        300,
        planDetailsTop + 100 * i
      );
    }
    planDetailsTop = planDetailsTop + 120;
  }
  doc.moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text("Thank you for choosing to partner with us .", 50, 780, {
      align: "center",
      width: 500,
    });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(amount, invoice) {
  if (amount) {
    return (
      invoice.currency +
      " " +
      parseFloat(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  } else {
    return "Not Applicable";
  }
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

function BooleanFormatter(booleanValue) {
  if (booleanValue) {
    return "Yes";
  } else {
    return "No";
  }
}
module.exports = {
  createInvoice,
};

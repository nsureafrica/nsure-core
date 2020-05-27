//@ts-check
const fs = require("fs");
const PDFDocument = require("pdfkit");
const moment = require("moment");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateQuoteDetails(doc, invoice)
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
  doc.fillColor("#444444").fontSize(20).text("Travel Cover Quote", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Start Date :", 50, customerInformationTop)
    .text(
      moment(invoice.startDate).format("Do MMM YYYY"),
      150,
      customerInformationTop
    )

    .text("End Date :", 50, customerInformationTop + 15)
    .text(
      moment(invoice.endDate).format("Do MMM YYYY"),
      150,
      customerInformationTop + 15
    )

    .text("Destination:", 50, customerInformationTop + 30)
    .text(invoice.destination, 150, customerInformationTop + 30)
    .font("Helvetica-Bold")
    .text(
      invoice.user.firstName + " " + invoice.user.lastName,
      300,
      customerInformationTop
    )
    .font("Helvetica")
    .text(invoice.user.phoneNumber, 300, customerInformationTop + 15)
    .text(invoice.user.email, 300, customerInformationTop + 30)
    .moveDown();

  // generateHr(doc, 252);
}
function generateTableRow(doc, y, item, value) {
  doc.font("Helvetica").fontSize(10).text(item, 50, y).text(value, 300, y);
}

function generateQuoteDetails(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Quote Details", 50, 280);
  generateHr(doc, 305);

  const planDetailsTop = 320;

  doc
    .fontSize(10)
    .text("Number Of Days:", 50, planDetailsTop)
    .font("Helvetica-Bold")
    .text(invoice.userInput.numberOfDays, 300, planDetailsTop)
    .font("Helvetica")
    .text("Amount :", 50, planDetailsTop + 20)
    .text(invoice.userInput.amount, 50, planDetailsTop + 20)
    .text("Schengen Countries Amount :", 50, planDetailsTop + 40)
    .text(invoice.userInput.schengenCountriesAmount, 150, planDetailsTop + 40)
    .text("Winter Sports Amount :", 50, planDetailsTop + 60)
    .text(invoice.userInput.winterSportsAmount, 150, planDetailsTop + 60)
    .text("Currency :", 50, planDetailsTop + 80)
    .text(invoice.userInput.currency, 300, planDetailsTop + 80)
    .text("Quote Amount :", 50, planDetailsTop + 100)
    .text(invoice.userInput.quoteAmount, 300, planDetailsTop + 100)

    .moveDown();
}

function generatePlanDetails(doc, invoice) {
  doc.addPage();
  var planDetailsTop = 50;
  doc.fillColor("#444444").fontSize(20).text("Plan Details", 50, planDetailsTop);

  planDetailsTop + 30
  doc.font("Helvetica-Bold");
  generateTableRow(doc, planDetailsTop, "Cover", "Value");
  generateHr(doc, planDetailsTop + 20);
  console.log(invoice.Underwriter.name)
  planDetailsTop = planDetailsTop + 30;

  doc.fontSize(11).font("Helvetica");
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

  var i;
  for (i = 0; i < meh.length; i++) {
    doc.text(meh[i].label, 50, planDetailsTop + 15 * i);
    doc.text(
      formatCurrency(meh[i].value, invoice),
      300,
      planDetailsTop + 20 * i
    );
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
  return (
    invoice.currency +
    " " +
    parseFloat(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
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

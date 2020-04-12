//@ts-check
const fs = require("fs");
const PDFDocument = require("pdfkit");
const moment = require('moment');

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
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
    .text("Travel Cover Details", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Start Date :", 50, customerInformationTop)
    .text(moment(invoice.startDate).format("Do MMM YYYY"), 150, customerInformationTop)

    .text("End Date :", 50, customerInformationTop +15)
    .text(moment(invoice.endDate).format("Do MMM YYYY"), 150, customerInformationTop + 15)

    .text("Destination:", 50, customerInformationTop +30)
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

function generatePlanDetails(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Details", 50, 280);
  generateHr(doc, 305);

  const planDetailsTop = 320;

  doc
    .fontSize(11)
    .font("Helvetica")
    .text("Follow Up Treatment In Country Of Residence :", 50, planDetailsTop)
    .text(BooleanFormatter(invoice.followUpTreatmentInCountryOfResidence), 300, planDetailsTop)
    .text("Medical Expenses:", 50, planDetailsTop + 15)
    .text(invoice.medicalExpenses, 300, planDetailsTop + 15)
    .text("Medical Evaluation Expenses:", 50, planDetailsTop + 30)
    .text(invoice.medicalEvaluationExpenses, 300, planDetailsTop + 30)
    .text("Repartriation Of Mortal Remains :", 50, planDetailsTop + 45)
    .text(BooleanFormatter(invoice.repartriationOfMortalRemains), 300, planDetailsTop + 45)
    .text("Accompanied By Family Member:", 50, planDetailsTop + 60)
    .text(invoice.accompaniedByFamilyMember, 300, planDetailsTop + 60)
    .text("Premature Return:", 50, planDetailsTop + 75)
    .text(BooleanFormatter(invoice.prematureReturn), 300, planDetailsTop + 75)
    .text("Legal Assistance:", 50, planDetailsTop + 90)
    .text(BooleanFormatter(invoice.legalAssistance), 300, planDetailsTop + 90)
    .text("Loss Or Theft:", 50, planDetailsTop + 105)
    .text(BooleanFormatter(invoice.lossOrTheft), 300, planDetailsTop + 105)
    .text("Luggage Delay:", 50, planDetailsTop + 120)
    .text(BooleanFormatter(invoice.luggageDelay), 300, planDetailsTop + 120)


    .moveDown();
}

function generateFooter(doc) {
  doc.fontSize(10).text("Thank you for choosing to partner with us .", 50, 780, {
    align: "center",
    width: 500
  });
}


function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(amount) {
  return (
    "USD " +
    parseFloat(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
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
        return "Yes"
    }else{
        return "No"
    }
}
module.exports = {
  createInvoice
};

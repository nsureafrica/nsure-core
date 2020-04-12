//@ts-check
const fs = require("fs");
const PDFDocument = require("pdfkit");
const moment = require("moment");
const lodash = require("lodash");
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
  doc.fillColor("#444444").fontSize(20).text("Travel Cover Details", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Policy Term :", 50, customerInformationTop)
    .text(invoice.policyTerm, 150, customerInformationTop)

    .text("Premium :", 50, customerInformationTop + 15)
    .text(invoice.premium, 150, customerInformationTop + 15)

    .text("Sum Assured :", 50, customerInformationTop + 30)
    .text(invoice.sumAssured, 150, customerInformationTop + 30)
    .text("Target Amount :", 50, customerInformationTop + 45)
    .text(invoice.targetAmount, 150, customerInformationTop + 45)
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
  doc.fillColor("#444444").fontSize(20).text("Details", 50, 280);
  generateHr(doc, 305);

  const planDetailsTop = 320;

  doc
    .fontSize(11)
    .font("Helvetica")
    .text("First Name :", 50, planDetailsTop)
    .text(invoice.firstName, 300, planDetailsTop)
    .text("Last Name", 50, planDetailsTop + 15)
    .text(invoice.lastName, 300, planDetailsTop + 15)
    .text("Date Of Birth", 50, planDetailsTop + 30)
    .text(moment(invoice.dob).format("Do MMM YYYY"), 300, planDetailsTop + 30)
    .text("Expected Commencement Date:", 50, planDetailsTop + 45)
    .text(moment(invoice.expectedCommencementDate).format("Do MMM YYYY"), 150, planDetailsTop +45)
    .text("Frequency :", 50, planDetailsTop + 60)
    .text(lodash.startCase(invoice.frequency), 300, planDetailsTop + 60)
    .moveDown();
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

function formatCurrency(amount) {
  return (
    "USD " +
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

//@ts-check

const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generatePlanDetails(doc, invoice);
  generateInvoiceTable(doc, invoice);
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
    .text("Medical Cover Quote", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Underwriter:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.underwriter.name, 150, customerInformationTop)
    .font("Helvetica")
    .text("Quote Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(formatCurrency(invoice.quoteTotal), 150, customerInformationTop + 30)

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
  generateHr(doc, 285);

  const planDetailsTop = 300;

  doc
    .fontSize(10)
    .text("Plan Name:", 50, planDetailsTop)
    .font("Helvetica-Bold")
    .text(invoice.planDetails.name, 160, planDetailsTop)
    .font("Helvetica")
    .text("Inpatient Cover Limit:", 50, planDetailsTop + 15)
    .text(
      formatCurrency(invoice.planDetails.inpatientCoverLimit),
      160,
      planDetailsTop + 15
    )
    .text("Outpatient Cover Limit:", 50, planDetailsTop + 30)
    .text(
      formatCurrency(invoice.planDetails.outpatientCoverLimit),
      160,
      planDetailsTop + 30
    )
    // .text("Chronic Cases:", 300, planDetailsTop)
    // .text(formatCurrency( invoice.planDetails.chronicCases), 400, planDetailsTop)
    .text("Maternity Cover Limit:", 300, planDetailsTop)
    .text(
      formatCurrency(invoice.planDetails.maternityCoverLimit),
      400,
      planDetailsTop
    )
    .text("Personal Accident:", 300, planDetailsTop + 15)
    .text(
      formatCurrency(invoice.planDetails.personalAccident),
      400,
      planDetailsTop + 15
    )

    .moveDown();
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 380;

  doc.font("Helvetica-Bold");
  generateTableRow(doc, invoiceTableTop, "Item", "Cost");
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");
  generateTableRow(
    doc,
    invoiceTableTop + 30,
    "Principal Rate Inpatient",
    formatCurrency(invoice.principalRate)
  );
  generateTableRow(
    doc,
    invoiceTableTop + 60,
    "Principal Rate Outpatient",
    formatCurrency(invoice.principalRateOutpatient)
  );
  generateTableRow(
    doc,
    invoiceTableTop + 90,
    "Spouse Rate Inpatient",
    formatCurrency(invoice.spouseRate)
  );
  generateTableRow(
    doc,
    invoiceTableTop + 120,
    "Spouse Rate Outpatient",
    formatCurrency(invoice.spouseRateOutpatient)
  );
  generateTableRow(
    doc,
    invoiceTableTop + 150,
    "Children Rate Inpatient",

    formatCurrency(invoice.childrenRate)
  );
  generateTableRow(
    doc,
    invoiceTableTop + 180,
    "Children Rate Outpatient",
    formatCurrency(invoice.childrenRateOutpatient)
  );
  generateTableRow(
    doc,
    invoiceTableTop + 210,
    "Levies",
    formatCurrency(invoice.levies)
  );
  generateTableRow(
    doc,
    invoiceTableTop + 240,
    "Stamp Duty",
    formatCurrency(invoice.stampDuty)
  );

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop + 270,
    "Total",
    formatCurrency(invoice.quoteTotal)
  );
}

function generateFooter(doc) {
  doc.fontSize(10).text("Thank You for choosing to partner with us", 50, 700, {
    align: "center",
    width: 500
  });
}

function generateTableRow(doc, y, item, value) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(value, 300, y);
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

function formatCurrency(amount) {
  return (
    "KES " +
    parseFloat(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}

module.exports = {
  createInvoice
};

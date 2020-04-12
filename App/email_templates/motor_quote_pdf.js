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
  doc.fillColor("#444444").fontSize(20).text("Motor Cover Quote", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Quote Date:", 50, customerInformationTop)
    .text(formatDate(new Date()), 150, customerInformationTop)

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
  doc.fillColor("#444444").fontSize(20).text("Vehicle Details", 50, 280);
  generateHr(doc, 305);

  const planDetailsTop = 320;

  doc
    .fontSize(10)
    .text("Cover Type:", 50, planDetailsTop)
    .font("Helvetica-Bold")
    .text(invoice.userInput.coverType, 150, planDetailsTop)
    .font("Helvetica")
    .text("Vehicle Type:", 50, planDetailsTop + 15)
    .text(invoice.userInput.vehicleType, 150, planDetailsTop + 15)
    .text("Nature Of Goods:", 50, planDetailsTop + 30)
    .text(invoice.userInput.natureOfGoods, 150, planDetailsTop + 30)
    .text("Estimated Car Value:", 300, planDetailsTop)
    .text(
      formatCurrency(invoice.userInput.estimatedCarValue),
      400,
      planDetailsTop
    )
    .text("Number of seats:", 300, planDetailsTop + 15)
    .text(invoice.userInput.noOfSeats, 400, planDetailsTop + 15)

    .moveDown();
}

function generateInvoiceTable(doc, invoice) {
  for (let counter = 0; counter < invoice.motorRates.length; counter++) {
    const element = invoice.motorRates[counter];
    if (counter % 2 !== 0) {
      doc.addPage();
      var invoiceTableTop = 45;
    } else {
      var invoiceTableTop = 420;
    }
    doc.font("Helvetica-Bold");
    generateTableRow(doc, invoiceTableTop, "Cover", "Value");
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    const position = invoiceTableTop + (counter - 1) * 30;
    generateTableHeader(
      doc,
      invoiceTableTop + 1 * 30,
      "Underwriter",
      element.underwriter.name
    );
    generateTableRow(doc, invoiceTableTop + 2 * 30, "Basic", element.basic);
    generateTableRow(
      doc,
      invoiceTableTop + 3 * 30,
      "Excess Protector",
      formatCurrency(element.excessProtector)
    );
    generateTableRow(
      doc,
      invoiceTableTop + 4 * 30,
      "Political Violence Terrorism",
      formatCurrency(element.politicalViolenceTerrorism)
    );
    generateTableRow(
      doc,
      invoiceTableTop + 5 * 30,
      "Passenger Legal Liability",
      formatCurrency(element.passengerLegalLiability)
    );
    generateTableRow(
      doc,
      invoiceTableTop + 6 * 30,
      "Roadside Assistance",
      formatCurrency(element.roadsideAssistance)
    );
    generateTableRow(
      doc,
      invoiceTableTop + 7 * 30,
      "Courtesy Car",
      formatCurrency(element.courtesyCar)
    );
    generateTableRow(doc, invoiceTableTop + 8 * 30, "Levies", element.levies);
    generateTableRow(
      doc,
      invoiceTableTop + 9 * 30,
      "Stamp Duty",
      formatCurrency(element.stampDuty)
    );
    generateTableRow(
      doc,
      invoiceTableTop + 10 * 30,
      "Quote Amount",
      formatCurrency(element.quoteAmount)
    );

    // generateHr(doc, position + 20);
  }
}

function generateFooter(doc) {
  doc.fontSize(10).text("Thank You for choosing to partner with us", 50, 780, {
    align: "center",
    width: 500,
  });
}

function generateTableRow(doc, y, item, value) {
  doc
    .font("Helvetica")
    .fontSize(10)
    .text(item, 50, y)
    .text(value, 300, y);
}

function generateTableHeader(doc, y, item, value) {
  doc.font("Helvetica-Bold").fontSize(10).text(item, 50, y).text(value, 300, y);
}
function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(amount) {
  return (
    "KES " +
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

module.exports = {
  createInvoice,
};

//@ts-check
const fs = require("fs");
const PDFDocument = require("pdfkit");

const meh = {
  motorRates: [
    {
      quoteAmount: 56292,
      basic: 47500,
      excessProtector: 5000,
      politicalViolenceTerrorism: 3500,
      passengerLegalLiability: 500000,
      roadsideAssistance: 0,
      levies: 252.00000000000003,
      stampDuty: 40,
      courtesyCar: 0,
      underwriter: ["Underwriters"]
    },
    {
      quoteAmount: 56292,
      basic: 47500,
      excessProtector: 5000,
      politicalViolenceTerrorism: 3500,
      passengerLegalLiability: 500000,
      roadsideAssistance: 0,
      levies: 252.00000000000003,
      stampDuty: 40,
      courtesyCar: 0,
      underwriter: ["Underwriters"]
    }
  ],
  user: {
    id: 2,
    firstName: "Allan",
    lastName: "Bikundo",
    phoneNumber: "0713805241",
    email: "allanbmageto@gmail.com",
    tempPassword: false,
    isVerified: true,
    UserCategoryId: 2,
    UserCategory: {
      id: 2,
      name: "Administrator",
      description: null,
      createdAt: "2020-02-27T05:32:22.000Z",
      updatedAt: "2020-02-27T05:32:22.000Z"
    },
    iat: 1585039419,
    exp: 1585082619
  },
  userInput: {
    classId: 5,
    vehicleType: "commercial",
    coverType: "comprehensive",
    natureOfGoods: "",
    estimatedCarValue: "1000000",
    roadsideAssistance: false,
    courtesyCar: false,
    excessProtector: true,
    politicalViolenceTerrorism: true,
    noOfSeats: 1000
  }
};

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generatePlanDetails(doc, meh);
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
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}
function generatePlanDetails(doc, invoice) {
  generateHr(doc, 285);

  const planDetailsTop = 300;

  doc
    .fontSize(10)
    .text("Cover Type:", 50, planDetailsTop)
    .font("Helvetica-Bold")
    .text(invoice.userInput.coverType, 160, planDetailsTop)
    .font("Helvetica")
    .text("Vehicle Type:", 50, planDetailsTop + 15)
    .text(
        "KES " + invoice.userInput.vehicleType,
        160,
      planDetailsTop + 15
    )
    .text("Nature Of Goods:", 50, planDetailsTop + 30)
    .text(
      "KES " + invoice.userInput.natureOfGoods,
      160,
      planDetailsTop + 30
    )
    .text("Estimated Car Value", 300, planDetailsTop)
    .text("KES " + invoice.userInput.estimatedCarValue, 400, planDetailsTop)
    .text("Number of seats", 300, planDetailsTop + 15)
    .text(
      "KES " + invoice.userInput.noOfSeats,
      400,
      planDetailsTop + 15
    )

    .moveDown();
}


function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc.fontSize(10).text("Thank You for choosing to partner with us", 50, 780, {
    align: "center",
    width: 500
  });
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};

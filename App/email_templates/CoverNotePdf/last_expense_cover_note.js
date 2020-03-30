const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  console.log(invoice.planDetails);
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateCustomerInformation2(doc, invoice);
  generateBenefitsPayable(doc, invoice);
  //   generatePlanDetails(doc, invoice);
  //   generateInvoiceTable(doc, invoice);
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
    .text("Last Expense Cover Note", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Underwriter:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text("Jubilee", 150, customerInformationTop)
    .font("Helvetica")
    .text("Cover Currency:", 50, customerInformationTop + 15)
    .text("KES", 150, customerInformationTop + 15)
    .text("Policy Number", 50, customerInformationTop + 30)
    .text(invoice.id + "/" + "lastExpense", 150, customerInformationTop + 30)

    .font("Helvetica-Bold")
    .text(
      invoice.firstName + " " + invoice.lastName,
      300,
      customerInformationTop
    )
    .font("Helvetica")
    .text("0713805241", 300, customerInformationTop + 15)
    .text("allanbmageto@gmail.com", 300, customerInformationTop + 30)
    .moveDown();

  // generateHr(doc, 252);
}

function generateCustomerInformation2(doc, invoice) {
  const customerInformationTop = 285;

  doc
    .fontSize(10)
    .text("Intermediary:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text("Spire Insuarance Brokers", 300, customerInformationTop)
    .font("Helvetica")
    .text("Commencement Date of the policy:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 300, customerInformationTop + 15)
    .text("Renewal Date of the policy:", 50, customerInformationTop + 30)
    .text(formatDate(new Date()), 300, customerInformationTop + 30)
    .moveDown();

  // generateHr(doc, 252);
}

function generateBenefitsPayable(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(18)
    .text("Benefits Payable", 50, 350);
  //Funeral expense
  doc
    .fillColor("#444444")
    .fontSize(15)
    .text("Funeral Expense", 50, 380);

  var customerInformationTop = 400;
  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Principal Member:", 50, customerInformationTop)
    .text(formatCurrency(500000), 300, customerInformationTop)
    .text("Spouse", 50, customerInformationTop + 15)
    .text(formatCurrency(500000), 300, customerInformationTop + 15)
    .text("Parents", 50, customerInformationTop + 30)
    .text(formatCurrency(500000), 300, customerInformationTop + 30)
    .text("Children", 50, customerInformationTop + 45)
    .text(formatCurrency(100000), 300, customerInformationTop + 45);
  // Policy limits
  doc
    .fillColor("#444444")
    .fontSize(15)
    .text("Policy Limits", 50, 465);

  var customerInformationTop = 485;

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Children", 50, customerInformationTop)
    .font("Helvetica")
    .text("Maximum Entry Age:", 50, customerInformationTop + 15)
    .text("1 month", 300, customerInformationTop + 15)
    .text("Maximum Entry Age: 18/25 years", 50, customerInformationTop + 30)
    .text("18/25 years", 300, customerInformationTop + 30)

    .font("Helvetica-Bold")
    .text("Principal Memeber and Spouses", 50, customerInformationTop + 50)
    .font("Helvetica")
    .text("Main Member/Spouse:", 50, customerInformationTop + 65)
    .text("18-75 years", 300, customerInformationTop + 65)
    .text("Parents", 50, customerInformationTop + 80)
    .text("75-90 years", 300, customerInformationTop + 80);

  //Waiting period
  doc
    .fillColor("#444444")
    .fontSize(15)
    .font("Helvetica-Bold")
    .text("Waiting Period", 50, 600);

  doc
    .fillColor("#444444")
    .font("Helvetica")
    .fontSize(10)
    .text("Waiting period for natural death is three(3) months.", 50, 620);

  doc
    .fillColor("#444444")
    .fontSize(10)
    .text("Accidental death covered immediately.", 50, 640);
}





function generateFooter(doc) {
  doc.fontSize(10).text("Thank You for choosing to partner with us", 50, 700, {
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

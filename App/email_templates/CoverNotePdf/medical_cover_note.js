const fs = require('fs');
const PDFDocument = require('pdfkit');

function createInvoice(invoice, path) {
    console.log(invoice.planDetails);
    let doc = new PDFDocument({ size: 'A4', margin: 50 });

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
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
        .text("Medical Cover Note", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
        .fontSize(10)
        .text("Policy Name:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text("Dependants:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text("Plan:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text("Amount Payable:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text("Policy Period:", 50, customerInformationTop)
        .font("Helvetica-Bold")
}

function generateFooter(doc) {
    doc.fontSize(10).text("Thank You for choosing to partner with us", 50, 700, {
        align: "center",
        width: 500
    });
}


module.exports = {
    createInvoice
  };
  
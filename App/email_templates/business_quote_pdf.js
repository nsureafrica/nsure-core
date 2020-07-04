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

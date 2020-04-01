const pdfcreation = require("./medical_cover_note");

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    }
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234
};

const lastExpenseCoverNote = {
  active: false,
  paid: false,
  id: 4,
  policyId: "de8eb9cd-5809-4f40-baa0-0129572b9cd3",
  firstName: "Allan",
  lastName: "Mageto",
  dateOfBirth: "",
  idNumber: "",
  kraPin: "",
  medicalHealthDeclaration: true,
  principalAgeDateOfBirth: "",
  notHealthyBeneficiaries: "",
  beneficiaries: "",
  numberOfChildren: 2,
  UserId: 13,
  BillId: 85,
  updatedAt: "2020-03-28T16:18:19.015Z",
  createdAt: "2020-03-28T16:18:19.015Z"
};

const policyPdfDirectory = "./documentsStorage/PolicyPdf/output.pdf";

pdfcreation.createInvoice(lastExpenseCoverNote, policyPdfDirectory);

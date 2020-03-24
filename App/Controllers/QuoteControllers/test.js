const pdfcreation = require("../../email_templates/motor_quote_pdf");

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

const lastexpensequote = {
  annualPremiumNuclearFamily: 600,
  annualPremiumExtraChild: 600,
  annualPremiumParents: 6120,
  quoteTotal: 7320,
  underwriter: {
    id: 4,
    name: "UAP",
    logo: "meh",
    address: "meh",
    website: "meh.com",
    contact: "seloseven",
    createdAt: "2020-03-17T09:08:04.000Z",
    updatedAt: "2020-03-17T09:08:04.000Z"
  },
  planDetails: {
    id: 5,
    name: "Plan 1",
    description: "",
    annualCover: 50000,
    typeOfClaim: "single",
    UnderwriterId: 3
  },

};

const policyPdfDirectory = "./documentsStorage/PolicyPdf/output.pdf";

pdfcreation.createInvoice(invoice, policyPdfDirectory);

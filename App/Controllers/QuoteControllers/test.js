const pdfcreation = require("../../email_templates/education_policy_pdf");

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111,
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234,
};

const travelPayload = {
  active: false,
  id: 3,
  ageNextBirthday: "12",
  dob: "2020-04-24T00:00:00.000Z",
  expectedCommencementDate: "2020-04-17T00:00:00.000Z",
  firstName: "Allan",
  frequency: "halfAnnually",
  lastName: "Bikundo",
  policyTerm: "10",
  premium: "11221121",
  sumAssured: "12",
  targetAmount: "1212",
  updatedAt: "2020-04-12T18:50:27.646Z",
  createdAt: "2020-04-12T18:50:27.646Z",
  user: {
    id: 13,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "0713805244",
    email: "allanbmageto2@yopmail.com",
    tempPassword: false,
    isVerified: true,
    UserCategoryId: 1,
    UserCategory: {
      id: 1,
      name: "Client",
      description: null,
      createdAt: "2020-02-27T05:32:03.000Z",
      updatedAt: "2020-02-27T05:32:03.000Z",
    },
    iat: 1586691181,
    exp: 1586734381,
  },
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
    updatedAt: "2020-03-17T09:08:04.000Z",
  },
  planDetails: {
    id: 5,
    name: "Plan 1",
    description: "",
    annualCover: 50000,
    typeOfClaim: "single",
    UnderwriterId: 3,
  },
};

const policyPdfDirectory = "./documentsStorage/PolicyPdf/output.pdf";

pdfcreation.createInvoice(travelPayload, policyPdfDirectory);

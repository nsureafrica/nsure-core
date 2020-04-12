//@ts-check

const EducationPolicy = require("../../Models/education_policy");
const CustomFilter = require("./custom_filter_policy_controller");
const transporter = require("../../Utils/mailService");
const invoiceEmail = require("./../../email_templates/invoicetemplate");
const Bill = require("../../Models/Bill")
const SharedControllers = require("./../SharedControllers/shared_controllers");
const EducationPolicyPDF = require("./../../email_templates/education_policy_pdf")
module.exports = {
  //education policies
  getUserEducationPolicies: (req, res) => {
    EducationPolicy.findAll({
      where: {
        UserId: req.user.id
      },
      include: [Bill]
    })
      .then(policies => {
        res.send(policies);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getEducationPolicy: (req, res) => {
    EducationPolicy.findOne({
      where: {
        id: req.params.policyId
      },
      include: [Bill]

    })
      .then(policy => {
        res.status(200).send(policy);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getAllEducationPolicies: (req, res) => {
    console.log("called")
    EducationPolicy.findAll({      include: [Bill]
    })
      .then(educationPolicies => {
        res.status(200).send(educationPolicies);
      })
      .catch(err => {
        res.status(200).send(err);
      });
  },
  createEducationPolicy: (req, res) => {
    EducationPolicy.create(req.body)
      .then(async response => {
        res.status(200).send(response);
        //SEND AN EMAIL
        var PolicyEmailJson = {};
        const userDetails = { user: req.user };
        Object.assign(PolicyEmailJson, req.body);
        Object.assign(PolicyEmailJson, userDetails);
        const policyPdfDirectory =
          "./documentsStorage/PolicyPdf/" + Date.now() + ".pdf";
        await EducationPolicyPDF.createInvoice(PolicyEmailJson, policyPdfDirectory);

        var mailOptions = {
          from: process.env.senderEmailAdress,
          to: req.user.email,
          cc: `${process.env.spireReceivingEmailAddress2}`,
          subject: "Education Policy Created",
          html: invoiceEmail.invoicePolicyEmail(req),
          attachments: [
            {
              // file on disk as an attachment
              filename: "educationPolicy.pdf",
              path: policyPdfDirectory, // stream this file
            },
          ],
        };
        transporter.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            //TODO save all failed mails to a certain table to be able to run a cron job hourly that resends all the mails
            console.log(err);
          } else {
            const notice = `Email sent: ` + info.response;
            console.log(notice);
          }
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  
  //Activate Last Expense Policy
  activateEducationPolicy: (req, res) => {
    SharedControllers.activatePolicy(req, res, EducationPolicy);
  },
  //custom filter
  customFilterEducationPolicy: (req, res) =>
    CustomFilter.customPolicyFilter(EducationPolicy, req, res)
};

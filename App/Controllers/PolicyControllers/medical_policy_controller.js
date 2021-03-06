//@ts-check

const MedicalPolicy = require("../../Models/medical_policy");
const CustomFilter = require("./custom_filter_policy_controller");
const Bill = require("./../../Models/Bill");
const transporter = require("../../Utils/mailService");
const invoiceEmail = require("./../../email_templates/invoicetemplate");
const SharedControllers = require("./../SharedControllers/shared_controllers");
module.exports = {
  //medical policy
  getUserMedicalPolicies: (req, res) => {
    MedicalPolicy.findAll({
      order: [["updatedAt", "DESC"]],
      where: {
        UserId: req.user.id,
      },
      include: [Bill],
    })
      .then((policies) => {
        res.status(200).send(policies);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getMedicalPolicy: (req, res) => {
    MedicalPolicy.findOne({
      where: {
        id: req.query.policyId,
      },
      include: [Bill],
    })
      .then((policy) => {
        res.send(policy);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  createMedicalPolicy: (req, res) => {
    Bill.create({
      amount: req.body.quoteAmount,
    }).then((billResponse) => {
      const billId = { BillId: billResponse.dataValues.id };
      Object.assign(req.body, billId);
      MedicalPolicy.create(req.body)
        .then((response) => {
          console.log(response);
          res.status(200).send(response);
          var selelectedOptionsRow = "";
          for (const property in response.dataValues) {
            selelectedOptionsRow += `<div style="background-color: transparent;line-height: inherit;"><div class="block-grid mixed-two-up" style="margin: 0 auto;min-width: 320px;max-width: 620px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;line-height: inherit;"><div style="border-collapse: collapse;display: table;width: 100%;background-color: #FFFFFF;line-height: inherit;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:620px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="413" style="background-color:#FFFFFF;width:413px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:0px;"><![endif]--><div class="col num8" style="display: table-cell;vertical-align: top;min-width: 320px;max-width: 408px;width: 413px;line-height: inherit;"><div style="width: 100% !important;line-height: inherit;"> <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 15px;padding-bottom: 0px;padding-right: 0px;padding-left: 0px;line-height: inherit;"> <!--<![endif]--> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]--><div style="color:#000000;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px;"><div style="font-size: 12px; line-height: 1.2; color: #000000; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;"><p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;"> <span style="color: #000000;font-size: 14px;line-height: inherit;"><a href="https://beefree.io" style="text-decoration: none;color: #000000;line-height: inherit;" target="_blank">${property}</a></span></p></div></div> <!--[if mso]></td></tr></table><![endif]--> <!--[if (!mso)&(!IE)]><!--></div> <!--<![endif]--></div></div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td><td align="center" width="206" style="background-color:#FFFFFF;width:206px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:0px;"><![endif]--><div class="col num4" style="display: table-cell;vertical-align: top;max-width: 320px;min-width: 204px;width: 206px;line-height: inherit;"><div style="width: 100% !important;line-height: inherit;"> <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent;border-left: 0px solid transparent;border-bottom: 0px solid transparent;border-right: 0px solid transparent;padding-top: 15px;padding-bottom: 0px;padding-right: 0px;padding-left: 0px;line-height: inherit;"> <!--<![endif]--> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]--><div style="color:#000000;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px;"><div style="font-size: 12px; line-height: 1.2; color: #000000; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;"><p style="font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin: 0;">${response[property]}</p></div></div> <!--[if mso]></td></tr></table><![endif]--> <!--[if (!mso)&(!IE)]><!--></div> <!--<![endif]--></div></div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--></div></div></div>`;
          }

          var mailOptions = {
            from: process.env.senderEmailAdress,
            to: `${req.user.email}`,
            bcc: `${process.env.spireReceivingEmailAddress},${process.env.businessTeamEmail}`,
            subject: "Medical Policy Created",
            html: invoiceEmail.invoicePolicyEmail(req),
          };
          // transporter.transporter.sendMail(mailOptions, (err, info) => {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     const notice = `Email sent: ` + info.response;
          //     console.log(notice);
          //   }
          // });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });
  },
  //get all medical policies
  getAllMedicalPolicies: (req, res) => {
    SharedControllers.getAllPolicies(req,res,MedicalPolicy)
  },
  //Activate Medical Policy
  activateMedicalPolicy: (req, res) => {
    SharedControllers.activatePolicy(req, res, MedicalPolicy);
  },
  //custom filter
  customFilterMedicalPolicy: (req, res) =>
    CustomFilter.customPolicyFilter(MedicalPolicy, req, res),
  exportDataAsCsv: (req, res) => {
    SharedControllers.exportDataAsCsv(req, res, MedicalPolicy);
  },
};

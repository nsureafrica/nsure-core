//@ts-check

var CronJob = require("cron").CronJob;

//Models
const MotorPoliciesModel = require("./../Models/motor_policy");
const MedicalPolicyModel = require("./../Models/medical_policy");
const EducationPolicyModel = require("./../Models/education_policy");
const TravelPolicyModel = require("./../Models/travel_policy");
const LastExpensePolicyModel = require("./../Models/last_expense_policy");

const BillModel = require("./../Models/Bill");
const UserModel = require("./../Models/User");

//Mail Service
const Transporter = require("./../Utils/mailService");

//Sequelize
const { Op } = require("sequelize");

//this is the file that will check on a daily for expired polices
var job = new CronJob(
  "* * * * * * ",
  function() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getFullYear() + 1);

  },
  null,
  true,
  "Africa/Nairobi"
);
job.start();

// Motor Policies job

function mailBillReminder(model, policyName) {
  model
    .findAll({
      include: [
        {
          model: BillModel,
          where: {
            paid: false
          }
        },
        { model: UserModel }
      ]
    })
    .then(result =>
      result.forEach(r => {
        var mailOptions = {
          from: process.env.senderEmailAdress,
          to: r.User.email,
          subject: `Premium balance reminder`,
          html: `<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>*|MC:SUBJECT|*</title></head><body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"><center><table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable"><tr><td align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" id="templatePreheader"><tr><td valign="top" class="preheaderContainer" style="padding-top:9px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner"><table align="left" border="0" cellpadding="0" cellspacing="0" width="282" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding: 9px 0px 9px 18px;color: #e67643;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size: 11px;font-weight: normal;">Quote Email</td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="padding: 12px 18px;"><table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: none;border-top-color: #999999;"><tbody><tr><td> <span></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader"><tr><td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock"><tbody class="mcnImageBlockOuter"><tr><td valign="top" style="padding:9px" class="mcnImageBlockInner"><table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer"><tbody><tr><td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0;"><img align="left" alt="" src="https://i.ibb.co/FzG7pKj/image.png" width="564" style="max-width:800px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage"></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="padding: 20px 18px 0px;"><table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: none;border-top-color: #EBEBEB;"><tbody><tr><td> <span></span></td></tr></tbody></table></td></tr></tbody></table></td></tr></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody"><tr><td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner"><table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding: 9px 18px;color: #302B2F;font-family: Georgia, Times, 'Times New Roman', serif;font-size: 16px;font-weight: normal;line-height: 150%;text-align: justify;text-transform:capitalize;"><div>Dear ${r.User.firstName}</div></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="padding: 0px 18px 10px;"><table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: none;border-top-color: #999999;"><tbody><tr><td> <span></span></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="padding: 0px 18px 10px;"><table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: none;border-top-color: #999999;"><tbody><tr><td> <span></span></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner"><table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding: 9px 18px;color: #302B2F;font-family: Georgia, Times, 'Times New Roman', serif;font-size: 16px;font-weight: normal;line-height: 150%;text-align: justify;"><div>Thanks for purchasing your insurance policy through our app. We noticed you have a premium balance of Kes ${r.Bill.amount - r.Bill.amountPaid} for your ${policyName}.<br>And because we don't want you to run the risk of being out of cover, we figured we should send you this reminder to make things easy for you.<br><br>Regards<br> Team spire</div></td></tr></tbody></table></td></tr></tbody></table></td></tr></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="600" id="templateFooter"><tr><td valign="top" class="footerContainer" style="padding-bottom:9px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="padding: 50px 18px 4px;"><table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top-width: 1px;border-top-style: none;border-top-color: #EBEBEB;"><tbody><tr><td> <span></span></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner"><table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding: 9px 18px;color: #e67643;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size: 11px;font-weight: normal;line-height: 150%;text-align: center;">This e-mail was sent by Spire Insurance Brokers. ${new Date().getDate()}/ ${new Date().getMonth() + 1}/${new Date().getFullYear()}</td></tr></tbody></table></td></tr></tbody></table></td></tr></table></td></tr></table></td></tr></table></center></body></html>`,
          text: `Quote Email

          Dear ${r.User.firstName}
          
          Thanks for purchasing your insurance policy through our app. We noticed you have a premium balance of KES ${r.Bill.amount - r.Bill.amountPaid} for your ${policyName}.
          And because we don't want you to run the risk of being out of cover, we figured we should send you this reminder to make things easy for you.
          
          Regards
          Team spire
          
          ============================================================
          
          This e-mail was sent by Spire Insurance Brokers. ${new Date().getDate()}/ ${new Date().getMonth() + 1}/${new Date().getFullYear()}
          
          `
        };
        Transporter.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            //TODO save all failed mails to a certain table to be able to run a cron job hourly that resends all the mails
            console.error(err);
          } else {
            const notice = `Email sent: ` + info.response;
            console.log(notice);
          }
        });

        console.log(r.User.email, r.Bill.amount, r.id);
      })
    )
    .catch(err => {
      console.log(err);
    });
}

function checkAndMailForPolicyExpiration(model, policyName) {
  var nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  MotorPoliciesModel.findAll({
    where: {
      createdAt: {
        [Op.gt]: nextYear.toISOString()
      }
    }
  })
    .then(policies => {
      console.log(policies[0].emailAddress);
    })
    .catch(err => {
      console.error(err);
    });
}

const checkPoliciesForExpiry = new CronJob("30 9 * * *", () => {
  console.info("Policy expiry cron job is running ");
  //Motor Policy
  checkAndMailForPolicyExpiration(MotorPoliciesModel, "Motor Policy");
  //Medical Policy
  checkAndMailForPolicyExpiration(MedicalPolicyModel, "Medical Policy");
  //Last Expense Policy
  checkAndMailForPolicyExpiration(
    LastExpensePolicyModel,
    "Last Expense Policy"
  );
  //Travel Policy
  // checkAndMailForPolicyExpiration(TravelPolicyModel, "Travel Policy");
  
  //Education Policy
  checkAndMailForPolicyExpiration(EducationPolicyModel, "Education Policy");
});

var billsCronJob = new CronJob("0 0 1 * *", () => {
  console.info("Bills cron job is running ");
  // Motor policies
  mailBillReminder(MotorPoliciesModel, "Motor Policy");
  //Medical Policy
  mailBillReminder(MedicalPolicyModel, "Medical Policy");
  //Last Expense Policy
  mailBillReminder(LastExpensePolicyModel, "Last Expense Policy");
  //Travel Policy
  mailBillReminder(TravelPolicyModel, "Travel Policy");
  //Education Policy
  mailBillReminder(EducationPolicyModel, "Education Policy");
});
//Start the cron jobs
checkPoliciesForExpiry.start();
billsCronJob.start();

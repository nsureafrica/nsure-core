// @ts-check

const TravelPolicy = require("../../Models/travel_policy");
const CustomFilter = require("./custom_filter_policy_controller");
const transporter = require("../../Utils/mailService");
const Bill = require("../../Models/Bill");
const invoiceEmail = require("./../../email_templates/invoicetemplate");
module.exports = {
  getUserTravelPolicy: (req, res) => {
    TravelPolicy.findAll({
      where: {
        UserId: req.user.id
      }
    })
      .then(policies => {
        res.send(policies);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getTravelPolicy: (req, res) => {
    TravelPolicy.findOne({
      where: {
        id: req.params.policyId
      }
    })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getAllTravelPolicies: (req, res) => {
    TravelPolicy.findAll().then(travelPolicies => {
      res.status(200).send(travelPolicies);
    });
  },
  createTravelPolicy: (req, res) => {
    Bill.create({
      amount: req.body.quoteAmount
    }).then(billResponse => {
      // handle the addition of files
      var passportArray = [];
      var nationalIDArray = [];
      var kraPinArray = [];
      req.files.passport.forEach(fileName => {
        passportArray.push(fileName.filename);
      });
      req.files.nationalId.forEach(fileName => {
        nationalIDArray.push(fileName.filename);
      });
      req.files.kraPin.forEach(fileName => {
        kraPinArray.push(fileName.filename)
      });

      const billId = { BillId: billResponse.dataValues.id };
      const passport =  {passport: passportArray.toString()}
      const nationalId = {nationalId: nationalIDArray.toString()}
      const kraPin = {kraPin: kraPinArray.toString()}
      const UserId = {UserId: req.user.id}
      Object.assign(req.body, billId);
      Object.assign(req.body, passport)
      Object.assign(req.body, nationalId)
      Object.assign(req.body, kraPin)
      Object.assign(req.body, UserId)
      console.log(req)
      TravelPolicy.create(req.body)
        .then(response => {
          res.send(response);
          //send a mail
          var mailOptions = {
            from: process.env.senderEmailAdress,
            to: `${process.env.spireReceivingEmailAddress2}`,
            subject: "Travel Policy Created",
            html: invoiceEmail.invoicePolicyEmail(req)
          };
          // transporter.transporter.sendMail(mailOptions, (err, info) => {
          //   if (err) {
          //     //TODO save all failed mails to a certain table to be able to run a cron job hourly that resends all the mails
          //     console.log(err);
          //   } else {
          //     const notice = `Email sent: ` + info.response;
          //     console.log(notice);
          //   }
          // });
        })
        .catch(err => {
          console.error(err);
          res.send(err);
        });
    });
  },
  //custom filter
  customFilterTravelPolicy: (req, res) =>
    CustomFilter.customPolicyFilter(TravelPolicy, req, res)
};

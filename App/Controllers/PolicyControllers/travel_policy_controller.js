// @ts-check

const TravelPolicy = require("../../Models/travel_policy");
const endpointAuthenticator = require("../../Utils/endpointAuthenticator");
const CustomFilter = require("./custom_filter_policy_controller")
const transporter = require("../../Utils/mailService");
const travelQuoteEmailAddress = process.env.travelQuoteEmailAddress
module.exports = {
  getUserTravelPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    TravelPolicy.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then(policies => {
        res.send(policies);
      })
      .catch(err => {
        res.status(500).send(err)
      });
  },
  getTravelPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    TravelPolicy.findOne({
      where: {
        id: req.params.policyId
      }
    })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.status(500).send(err)
      });
  },
  createTravelPolicy: (req, res) => {
    // endpointAuthenticator.authenticateUser(req, res);
    TravelPolicy.create(req.body)
      .then(response => {
        res.send(response);
        console.log(travelQuoteEmailAddress)
        //send a mail
        var mailOptions = {
          from: "technical@nsureafrica.com",
          to: `${travelQuoteEmailAddress},allanmageto@yopmail.com`,
          subject: "Travel Insurance Quote",
          html: `<b>Dear Spire,</b><br/><p>Your quote breakdown is as follows</p><p><b>Selected Options:</b></p>${JSON.stringify(
            req.body
          )}<p><b>Quote</b></p>${JSON.stringify(response)}`
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
        res.status(500).send(err)
      });
  },
  //custom filter
  customFilterTravelPolicy:(req,res)=>CustomFilter.customPolicyFilter(TravelPolicy,req,res)
};

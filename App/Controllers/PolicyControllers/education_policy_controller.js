//@ts-check

const EducationPolicy = require("../../Models/education_policy");
const CustomFilter = require("./custom_filter_policy_controller")
const authenticatedEndpoint = require("../../Utils/endpointAuthenticator");
const transporter = require("../../Utils/mailService");

module.exports = {
  //education policies
  getUserEducationPolicies: (req, res) => {
    authenticatedEndpoint.authenticateUser(req, res);
    EducationPolicy.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then(policies => {
        res.send(policies);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getEducationPolicy: (req, res) => {
    authenticatedEndpoint.authenticateUser(req, res);
    EducationPolicy.findOne({
      where: {
        id: req.params.policyId
      }
    })
      .then(policy => {
        res.status(200).send(policy);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  createEducationPolicy: (req, res) => {
    const user = authenticatedEndpoint.authenticateUser(req, res);
    EducationPolicy.create(req.body)
      .then(response => {
        res.send(response);
        //SEND AN EMAIL
        var mailOptions = {
          from: "technical@nsureafrica.com",
          to: `${user.email}`,
          subject: "Education Quote Created",
          text: `Hello ${user.firstName} ${user.lastName}, You have requested for an education policy quote at Spiresure. Your education policy id is ${response.id}`
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
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
  //custom filter
  customFilterEducationPolicy:(req,res)=>CustomFilter.customPolicyFilter(EducationPolicy,req,res)
};

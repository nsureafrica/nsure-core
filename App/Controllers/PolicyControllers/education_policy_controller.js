//@ts-check

const EducationPolicy = require("../../Models/education_policy");
const CustomFilter = require("./custom_filter_policy_controller")
const transporter = require("../../Utils/mailService");

module.exports = {
  //education policies
  getUserEducationPolicies: (req, res) => {
    EducationPolicy.findAll({
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
  getEducationPolicy: (req, res) => {
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

  getAllEducationPolicies: (req,res) => {
    EducationPolicy.findAll()
    .then(educationPolicies => {
      res.status(200).send(educationPolicies)
    })
    .catch(err => {
      res.status(200).send(err)
    })
  },
  createEducationPolicy: (req, res) => {
    EducationPolicy.create(req.body)
      .then(response => {
        res.status(200).send(response);
        //SEND AN EMAIL
        var mailOptions = {
          from: process.env.senderEmailAdress,
          to: `${req.user.email},${process.env.spireReceivingEmailAddress}`,
          subject: "Education Policy Created",
          text: `Hello ${req.user.firstName} ${req.user.lastName}, You have requested for an education policy at Spiresure. Your education policy id is ${response.id}`
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

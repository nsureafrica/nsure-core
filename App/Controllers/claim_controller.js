// @ts-check

const ClaimModel = require("../Models/Claim");
const policyTypeModel = require("../Models/policy_type");
const authenticatedEndpoint = require("../Utils/endpointAuthenticator");
const transporter = require("../Utils/mailService");
const Sequelize = require("sequelize");

module.exports = {
  uploadClaim: (req, res) => {
    //authenticated endpoint
    // const user = authenticatedEndpoint.authenticateUser()
    var photosNameArray = [];
    var claimFormsArray = [];
    req.files.claimPhotos.forEach(fileName => {
      photosNameArray.push(fileName.filename);
    });
    req.files.claimDocs.forEach(fileName => {
      claimFormsArray.push(fileName.filename);
    });
    ClaimModel.create({
      descriptionOfClaim: req.body.descriptionOfClaim,
      UserId: req.body.userId,
      PolicyTypeId: req.body.policyTypeId,
      claimForms: claimFormsArray.toString(),
      claimPhotos: photosNameArray.toString(),
      policyId: req.body.policyId
    })
      .then(response => {
        // var mailOptions = {
        //   from: "technical@nsureafrica.com",
        //   to: `${user.email}`,
        //   subject: "Claim Created",
        //   text: `Hello ${user.firstName} ${user.lastName}, You have created a claim at Spiresure. Your claim id is ${response.id}`
        // };
        // transporter.sendMail(mailOptions, (err, info) => {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     const notice = `Email sent: ` + info.response;
        //     console.log(notice);
        //   }
        // });
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getClaim: (req, res) => {
    ClaimModel.findOne({ where: { id: req.params.claimId } })
      .then(claim => {
        res.status(200).send(claim);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getUserClaims: (req, res) => {
    ClaimModel.findAll({
      order: [['updatedAt', 'DESC']],
      include: [policyTypeModel],
      where: { UserId: req.params.userId }
    })
      .then(userClaims => {
        res.status(200).send(userClaims);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};

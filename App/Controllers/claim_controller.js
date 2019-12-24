// @ts-check


const ClaimModel = require("../Models/Claim");

module.exports = {
  uploadClaim: (req, res) => {
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
      UserId: req.body.UserId,
      PolicyTypeId: req.body.policyTypeId,
      claimForms: claimFormsArray.toString(),
      claimPhotos: photosNameArray.toString()
    })
      .then(res => {
        res.send(res);
      })
      .catch(err => {
        res.send(err);
      });
  },
  getClaim: (req, res) => {
    ClaimModel.findOne({ where: { id: req.params.claimId } })
      .then(claim => {
        res.send(claim);
      })
      .catch(err => {
        res.send(err);
      });
  },
  getUserClaims: (req, res) => {
    ClaimModel.findOne({where: { UserId: req.params.userId}})
      .then(userClaims => {
        res.send(userClaims);
      })
      .catch(err => {
        res.send(err);
      });
  }
};

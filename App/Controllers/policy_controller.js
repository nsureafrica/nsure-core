MotorPolicy = require("../Models/motor_policy");
MotorCategory = require("../Models/motor_category");
MedicalPolicy = require("../Models/medical_policy");
MedicalBeneficiaries = require("../Models/medical_policy_beneficiaries");
EducationPolicy = require("../Models/education_policy");
PolicyType = require("../Models/policy_type")
module.exports = {
  getAllUserPolicies: (req, res) => {},
  getUserMotorPolicies: (req, res) => {
    MotorPolicy.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then(policies => {
        res.send(policies);
      })
      .catch(err => {
        res.send(err);
      });
  },
  getMotorPolicy: (req, res) => {
    MotorPolicy.findOne({
      where: {
        id: req.params.policyId
      }
    })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.send(err);
      });
  },
  createMotorPolicy: (req, res) => {
    MotorPolicy.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  },
  getUserMedicalPolicies: (req, res) => {
    MedicalPolicy.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then(policies => {
        res.send(policies);
      })
      .catch(err => {
        res.send(err);
      });
  },
  getMedicalPolicy: (req, res) => {
    MedicalPolicy.findOne({
      where: {
        id: req.params.policyId
      }
    })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.send(err);
      });
  },
  createMedicalPolicy: (req, res) => {
    MedicalPolicy.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  },
  getUserEducationPolicies: (req, res) => {
    EducationPolicy.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then(policies => {
        res.send(policies);
      })
      .catch(err => {
        res.send(err);
      });
  },
  getEducationPolicy: (req, res) => {
    EducationPolicy.findOne({
      where: {
        id: req.params.policyId
      }
    })
      .then(policy => {
        res.send(policy);
      })
      .catch(err => {
        res.send(err);
      });
  },
  createEducationPolicy: (req, res) => {
    EducationPolicy.create(req.body)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.send(err);
      });
  },

  //this is for internal use to create policies and their description and store them in the db
  createPolicy: (req, res) => {
    PolicyType.create({
      policyTypeName: req.body.policyTypeName,
      policyTypeDesc: req.body.policyTypeDesc
    }).then(response => {
      res.send(response)
    }).catch(err => {
      console.log(err)
      res.send(err)
    })
  }
};

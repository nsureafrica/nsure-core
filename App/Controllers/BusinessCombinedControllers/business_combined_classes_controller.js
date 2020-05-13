//@ts-check

const BusinessCombinedClassesModel = require("./../../Models/business_combined_classes")
const UnderwriterModel = require("../../Models/underwriters");
const SharedControllers = require("../SharedControllers/shared_controllers");

module.exports = {
    createClass: (req, res) => {
        BusinessCombinedClassesModel.create(req.body)
        .then(response => {
          res.send(response);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
  
    getOneClass: (req, res) => {
        BusinessCombinedClassesModel.findOne({
        where: {
          id: req.params.id
        }
      })
        .then(rates => {
          res.send(rates);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
    getAllClasses: (req, res) => {
        BusinessCombinedClassesModel.findAll({
        include: [UnderwriterModel]
      })
        .then(rates => {
          res.send(rates);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
    updateClassById: (req,res) => {
      SharedControllers.updateEntryById(req,res,BusinessCombinedClassesModel)
    }
  };
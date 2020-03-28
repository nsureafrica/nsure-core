//@ts-check


const archiver = require("../../Utils/archive")
const TravelPolicyModel = require("./../../Models/travel_policy")
const MotorPolicyModel = require("./../../Models/motor_policy")
const ClaimModel = require("./../../Models/Claim")
module.exports = {
    downloadTravelDocuments: async (req,res)=>{
         const travelPolicyDocuments = await TravelPolicyModel.findOne({where: {id:req.body.travelPolicyId}})
        var nationalIdArray = travelPolicyDocuments.nationalId.split(",");
        var passportArray = travelPolicyDocuments.passport.split(",")
        var filesArray = [...nationalIdArray, ...passportArray];
        archiver.archiveFunction(req,res,"logbooks",filesArray)
        // archiver.archiveFunction(req,res,"logbooks")
    },

    downloadMotorDocuments: async (req,res)=> {
        const MotorPolicyModelResponse = await MotorPolicyModel.findOne({where: {id:req.body.motorPolicyId}}) 
        var kraPinArray = MotorPolicyModelResponse.kraPin.split(",");
        var idNumberArray = MotorPolicyModelResponse.idNumber.split(",");
        var logbookPathArray = MotorPolicyModelResponse.logbookPath.split(",");
        var filesArray = [...kraPinArray, ...idNumberArray, ...logbookPathArray];
        archiver.archiveFunction(req,res,"logbooks",filesArray)
    },

    downloadClaimDocuments: async (req,res)=> {
        const ClaimModelResponse = await ClaimModel.findOne({where: {id:req.body.claimId}})
        var claimPhotosArray =  ClaimModelResponse.claimForms.split(",");
        var claimDocs = ClaimModelResponse.claimPhotos.split(",");
        var filesArray = [...claimPhotosArray, ...claimDocs];
        archiver.archiveFunction(req,res,"claimDocuments",filesArray)
    },
}
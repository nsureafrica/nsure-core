//@ts-check


const archiver = require("../../Utils/archive")
module.exports = {
    downloadLogbooks:(req,res)=>{
        archiver.archiveFunction(req,res,"logbooks")
    },
    downloadClaimDocuments:(req,res)=>{
        archiver.archiveFunction(req,res,"claimDocuments")
    }
}
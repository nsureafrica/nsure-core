//@ts-check


const archiveController = require("./../../Controllers/DownloadControllers/download")
module.exports = app => {    
    app.route("/download/claims/downloadClaimDocuments").get(archiveController.downloadClaimDocuments);

    app.route("/download/travel/downloadtraveldocuments").get(archiveController.downloadTravelDocuments);

    app.route("/download/motor/downloadmotordocuments").get(archiveController.downloadMotorDocuments);

    
}
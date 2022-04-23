//@ts-check


const archiveController = require("./../../Controllers/DownloadControllers/download")
module.exports = app => {
    app.route("/api/download/claims/downloadClaimDocuments").get(archiveController.downloadClaimDocuments);

    app.route("/api/download/travel/downloadtraveldocuments").get(archiveController.downloadTravelDocuments);

    app.route("/api/download/motor/downloadmotordocuments").get(archiveController.downloadMotorDocuments);


}
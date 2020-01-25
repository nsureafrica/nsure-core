//@ts-check


const archiveController = require("./../../Controllers/DownloadControllers/download")
module.exports = app => {
    app.route("/download/motor/downloadLogbooks").get(archiveController.downloadLogbooks);
    
    app.route("/download/motor/downloadClaimDocuments").get(archiveController.downloadClaimDocuments);
    
}
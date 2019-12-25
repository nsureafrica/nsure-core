// @ts-check

const path = require("path");
const multer = require("multer");
const fs = require("fs");


const claimDocsStorage = multer.diskStorage({
  destination: function(req, res, cb) {

    const claimDocsStorageDirectory = "./documentsStorage/claimsDocuments";
    // ensure directory exists
    fs.existsSync(claimDocsStorageDirectory) || fs.mkdirSync(claimDocsStorageDirectory);

    cb(null, claimDocsStorageDirectory);
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var logbookStorage = multer.diskStorage({
  destination: function(req,res,cb){

    const logbookStorageDirectory = "./documentsStorage/claimsDocuments";
    // ensure directory exists
    fs.existsSync(logbookStorageDirectory) || fs.mkdirSync(logbookStorageDirectory);

    cb(null, logbookStorageDirectory);
  },
  filename: function(req,file,cb){
    cb(null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      ); 
  }
})
module.exports = {
   uploadClaimDocs:multer({
    storage: claimDocsStorage,
    limits: { fileSize: 1000000 }
  }),
  uploadLogbook:multer({
    storage: logbookStorage,
    limits: {fileSize: 100000}
  })
};

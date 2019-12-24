// @ts-check

const path = require("path");

const multer = require("multer");


var claimDocsStorage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./documentsStorage/claimsDocuments");
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
    cb(null, "./documentsStorage/logbooks");
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

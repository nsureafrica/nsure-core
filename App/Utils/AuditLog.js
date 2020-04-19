
const AuditLogModel = require("./../Models/AuditLogs");
const iplocate = require("node-iplocate");

const LogIt = function (req) {
    iplocate(req.ip)
      .then(function (results) {
        AuditLogModel.create({
          UserId: req.user.id,
          action: req.url,
          country: results.country_code,
          county: results.city,
          clientInformation: req.headers["user-agent"],
          continent: results.continent,
        })
          .then(console.log("logged succesfully"))
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  
module.exports = LogIt;
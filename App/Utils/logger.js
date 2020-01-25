//@ts-check

const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
var fs = require("fs");

var logDirectory = path.join(__dirname, "../../log");
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory
});
module.exports = app => {
  app.use(morgan("combined", { stream: accessLogStream }));
};

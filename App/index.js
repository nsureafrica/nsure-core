//@ts-check
const express = require("express");
// require("./passport");
const router = require("./Router/router");
const port = process.env.PORT;
const HTTPS_PORT = process.env.HTTPS_PORT
const path = require("path");
const database = require("./DB/database");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const EndpointAuthenticator = require("./Middleware/EndpointAuthenticator")
const app = express();
const sequelizeConnection = require("../App/DB/database").sequelizeConnection;
const bodyParser = require("body-parser")
const spdy = require('spdy');
const fs = require('fs');

//i need to move this later
require("./Models/CategoryHasPermission")
// morgan
const morgan = require("./Utils/logger");
morgan(app);


require("./Utils/cron_job")
//add middleware here
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(EndpointAuthenticator)
app.use(express.static(path.join(__dirname, "../build")));

//swagger
const swagger = require("./Utils/swagger");
const { Console } = require("console");
const { domain } = require("process");
swagger(app);

//Routes
router(app);


if (process.env.NODE_ENV === "PRODUCTION") {

  const domainName = process.env.domainName

  const privateKey = fs.readFileSync('/etc/letsencrypt/live/'+domainName+'/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/'+domainName+'/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/'+domainName+'/chain.pem', 'utf8');
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  //CREATE A HTTPS SERVER HERE
  const http2Server = spdy.createServer(credentials, app);

  app.listen(port, () => {
    console.log(`Server application running on port ${port}`);
  });
  http2Server.listen(HTTPS_PORT, () => {

    console.log('prod https');

    console.log(`App listening on port ${HTTPS_PORT}!`);

  }).on("error", (error) => {

    console.error(error)
  });

} else {
  app.listen(port, () => {
    console.log(`Server application running on port ${port}`);
  });
}



database.testConnection();

//remember to disable alter

if (process.env.NODE_ENV === "DEVELOPMENT") {
  sequelizeConnection.sync({ alter: true });
  // sequelizeConnection.sync();
}
else if (process.env.NODE_ENV === "TEST") {
  // sequelizeConnection.sync({force:true});
} else if (process.env.NODE_ENV === "PRODUCTION") {
  sequelizeConnection.sync();
}

//@ts-check

const express = require("express");
// require("./passport");
const router = require("./Router/router");
const port = process.env.PORT;
const path = require("path");
const database = require("./DB/database");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const EndpointAuthenticator = require("./Middleware/EndpointAuthenticator")
const app = express();
const sequelizeConnection = require("../App/DB/database").sequelizeConnection;
const bodyParser = require("body-parser")
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
swagger(app);

//Routes
router(app);

app.listen(port, () => {
  console.log(`Server application running on port ${port}`);
});

database.testConnection();

//remember to disable alter

if (process.env.NODE_ENV === "DEVELOPMENT") {
  console.log(process.env.NODE_ENV);
  sequelizeConnection.sync({alter:true});
}
else if (process.env.NODE_ENV === "TEST") {
  // sequelizeConnection.sync({force:true});
} else if(process.env.NODE_ENV === "UAT"){
  sequelizeConnection.sync();
}

const express = require("express");
const morgan = require('morgan')
require("./passport");
const router = require("./Router/router");
const port = process.env.PORT;
const path = require('path');
const database = require("./DB/database");
const cors = require("cors");

const app = express();
app.use(morgan())
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));


//swagger 
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "NSURE API",
      description: "NSURE API Information",
      contact: {
        name: "Allan Mageto"
      },
      servers: ["http://localhost:8080"]
    }
  },
  // ['.routes/*.js']
  apis: ["App/Router/router.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router(app);

app.listen(port, () => {
  console.log(`Server application running on port ${port}`);
});

database.testConnection();
const sequelizeConnection = require("../App/DB/database").sequelizeConnection;

sequelizeConnection.sync();


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

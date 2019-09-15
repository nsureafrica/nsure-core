const express = require("express");
require("./passport");
const router = require("./Router/router");
const port = process.env.PORT;
const database = require("./DB/database");
const app = express();
app.use(express.json());
router(app);

app.listen(port, () => {
  console.log(`Server application running on port ${port}`);
});

database.testConnection();
const sequelizeConnection = require("../App/DB/database").sequelizeConnection;

sequelizeConnection.sync();

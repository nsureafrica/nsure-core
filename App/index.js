const express = require("express");
require("./passport");
const router = require("./Router/router");
const port = process.env.PORT;
const path = require('path');
const database = require("./DB/database");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

router(app);

app.listen(port, () => {
  console.log(`Server application running on port ${port}`);
});

database.testConnection();
const sequelizeConnection = require("../App/DB/database").sequelizeConnection;

sequelizeConnection.sync();

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

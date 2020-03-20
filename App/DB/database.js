const Sequelize = require("sequelize");
const database = process.env.db_schema;
const username = process.env.db_username;
const password = process.env.db_password;
const host = process.env.db_host;


const sequelizeConnection = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
  paranoid: true,

});

global.sequelizeConnection = sequelizeConnection;

const testConnection = () => {
  sequelizeConnection
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
};

module.exports = { sequelizeConnection, testConnection};

const Sequelize = require("sequelize");
const Claim = require("./Claim");

const ClaimForm = sequelizeConnection.define("Claim", {
    descriptionOfClaim: {
        type: Sequelize.STRING(),
        allowNull: false
    }
})


//lets cuff these tables
Claim.hasMany(ClaimForm);

module.exports = ClaimForm
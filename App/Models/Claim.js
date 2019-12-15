const Sequelize = require("sequelize");
const User = require("./User");
const PolicyType = require("./policy_type");

const Claim = sequelizeConnection.define("Claim", {
    descriptionOfClaim: {
        type: Sequelize.STRING(),
        allowNull: false
    }
})

Claim.belongsTo(User);
Claim.hasMany(PolicyType)

module.exports = Claim
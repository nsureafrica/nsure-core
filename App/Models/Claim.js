const Sequelize = require("sequelize");
const User = require("./User");
const PolicyType = require("./policy_type");

const Claim = sequelizeConnection.define("Claim", {
    descriptionOfClaim: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    claimForms:{
        type:Sequelize.STRING(),
        allowNull: true
    },
    claimPhotos:{
        type:Sequelize.STRING(),
        allowNull: true
    }
})

Claim.belongsTo(User);
Claim.belongsTo(PolicyType)

module.exports = Claim
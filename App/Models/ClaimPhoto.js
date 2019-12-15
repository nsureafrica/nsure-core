const Sequelize = require("sequelize");
const Claim = require("./Claim");

const ClaimPhoto = sequelizeConnection.define("Claim", {
    descriptionOfClaim: {
        type: Sequelize.STRING(),
        allowNull: false
      }
})

ClaimPhoto.belongsTo(Claim);

module.exports = ClaimPhoto
const Sequelize = require("sequelize");
const User = require("./User");
const PolicyType = require("./policy_type");


const Sendy = sequelizeConnection.define("Sendy", {
    order_no: {
        type: Sequelize.STRING(),
        allowNull: true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    currency:{
        type:Sequelize.STRING(),
        allowNull: true
    },
    vendor:{
        type:Sequelize.STRING(),
        allowNull:true
    },
    distance: {
        type: Sequelize.STRING(),
        allowNull: true
    },
    eta:{
        type:Sequelize.STRING(),
        allowNull: true
    },
    etd:{
        type:Sequelize.STRING(),
        allowNull: true
    },
    amount_return:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    order_status: {
        type: Sequelize.STRING(),
        allowNull: true
    },
    pick_up_date:{
        type:Sequelize.STRING(),
        allowNull: true
    },
    drop_shipping_order:{
        type:Sequelize.STRING(),
        allowNull: true
    },
    pairing_response:{
        type:Sequelize.STRING(),
        allowNull:true
    },
    tracking_link: {
        type: Sequelize.STRING(),
        allowNull: true
    },
    policyId:{
        type:Sequelize.INTEGER,
        allowNull:true
    }
})
Sendy.belongsTo(PolicyType)


module.exports = Sendy
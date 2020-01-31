const Sequelize = require("sequelize");
const User = require("./User");
const PolicyType = require("./policy_type");


const Sendy = sequelizeConnection.define("Sendy", {
    order_no: {
        type: Sequelize.STRING(),
        allowNull: false
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
        allowNull:false
    },
    distance: {
        type: Sequelize.STRING(),
        allowNull: false
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
        allowNull:false
    },
    order_status: {
        type: Sequelize.STRING(),
        allowNull: false
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
        allowNull:false
    },
    tracking_link: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    policyId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
Sendy.belongsTo(PolicyType)


module.exports = Sendy
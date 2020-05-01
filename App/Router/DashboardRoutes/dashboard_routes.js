//@ts-check

const dashboardController = require("./../../Controllers/dashboard_controller")
module.exports = app => {
    app.route("/dashboard/getDashboardData").get(dashboardController.getDashboardData);

}
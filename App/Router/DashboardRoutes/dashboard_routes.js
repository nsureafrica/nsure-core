//@ts-check

const dashboardController = require("./../../Controllers/dashboard_controller")
module.exports = app => {
    app.route("/api/dashboard/getDashboardData").get(dashboardController.getDashboardData);

}
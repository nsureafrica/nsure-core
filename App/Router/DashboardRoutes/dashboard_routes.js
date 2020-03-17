//@ts-check

const dashboardController = require("./../../Controllers/dashboard_controller")
module.exports = app => {
    app.route("/dashboard/getdashboarddata").get(dashboardController.getDashboardData);

}
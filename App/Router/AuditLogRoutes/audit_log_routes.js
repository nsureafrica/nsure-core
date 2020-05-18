//@ts-check

const AuditLogsController = require("./../../Controllers/AuditLogControllers/audit_log_controller")

module.exports = (app) => {
    app
    .route("/auditLogs/getAll")
    .get(AuditLogsController.getAll);
}
//@ts-check

const AuditLogsController = require("./../../Controllers/AuditLogControllers/audit_log_controller")

module.exports = (app) => {
    app
        .route("/api/auditLogs/getAll")
        .get(AuditLogsController.getAll);
}
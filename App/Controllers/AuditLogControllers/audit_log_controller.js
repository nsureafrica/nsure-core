//@ts-check

const AuditLogModel = require("./../../Models/AuditLogs")

module.exports = {
    getAll: async (req, res) => {
        try {
            const auditLogs = await AuditLogModel.findAll()
            res.send(auditLogs)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}
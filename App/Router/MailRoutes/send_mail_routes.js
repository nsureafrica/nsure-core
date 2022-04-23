//@ts-check

const SendMailController = require('./../../Controllers/send_mail_controller')
module.exports = app => {
    app.route("/api/sendMail/allUsers").post(SendMailController.sendMailToAllUsers);
}
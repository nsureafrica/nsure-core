//@ts-check
const nodemailer = require("nodemailer");



module.exports = {
     
     transporter: nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.user,
          clientId: process.env.clientId,
          clientSecret: process.env.clientSecret,
          refreshToken: process.env.refreshToken,
          accessToken: process.env.accessToken,
          expires: Number.parseInt(process.env.expires, 10)
        }
    })
}
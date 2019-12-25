// const { google } = require("googleapis");
// const code = "";

// const oauth2Client = new google.auth.OAuth2(
//   process.env.clientId,
//   process.env.clientSecret,
//   process.env.redirectUrl
// );

// const getToken = async () => {
//   const { tokens } = await oauth2Client.getToken(code);
//   console.info(tokens);
// };
// getToken();
// const GMAIL_SCOPES = [
//   "https://mail.google.com/",
//   "https://www.googleapis.com/auth/gmail.modify",
//   "https://www.googleapis.com/auth/gmail.compose",
//   "https://www.googleapis.com/auth/gmail.send"
// ];
// const url = oauth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: GMAIL_SCOPES
// });

// console.info(`authUrl: ${url}`);

const fs = require("fs");
const jwt = require("jsonwebtoken");
// const privateKey = fs.readFileSync("./private.key", "utf8");
// const publicKey = fs.readFileSync("./public.key", "utf8");
const privateKey = fs.readFileSync("./private.key","utf8");
const publicKey = fa.readFileSync("./public.key", "utf8");
const options = {
  // issuer: options.issuer,
  // subject: options.subject,
  // audience: options.audience,
  expiresIn: "1h",
  algorithm: "RS256"
};

module.exports = {
  sign: payload => {
    return jwt.sign(payload, privateKey, options);
  },
  verify: token => {
    try {
      return jwt.verify(token, publicKey, options);
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  decode: token => {
    return jwt.decode(token, { complete: true });
  }
};

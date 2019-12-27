//@ts-check

const ClaimController = require("../Controllers/claim_controller");
const Storage = require("../Storage/storage");

module.exports = app => {
  app.post(
    "/createClaim",
    Storage.uploadClaimDocs.fields([
      { name: "claimPhotos", maxCount: 5 },
      { name: "claimDocs", maxCount: 5 }
    ]),
    ClaimController.uploadClaim
  );

  app.get("/getClaim/:claimId", ClaimController.getClaim);
  app.get("/getUserClaims/:userId", ClaimController.getUserClaims);
};

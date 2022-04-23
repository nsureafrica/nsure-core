//@ts-check

const ClaimController = require("../Controllers/claim_controller");
const Storage = require("../Storage/storage");

module.exports = app => {
  app.post(
    "/api/createClaim",
    Storage.uploadClaimDocs.fields([
      { name: "claimPhotos", maxCount: 5 },
      { name: "claimDocs", maxCount: 5 }
    ]),
    ClaimController.uploadClaim
  );

  app.get("/api/getClaim/:claimId", ClaimController.getClaim);
  app.get("/api/getUserClaims/:userId", ClaimController.getUserClaims);
  app.get("/api/claims/getAllClaims", ClaimController.getAllClaims);
  // app.get("/ge")
};

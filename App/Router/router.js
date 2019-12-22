const UserController = require("../Controllers/user_controller");
const PolicyController = require("../Controllers/policy_controller");
const QuoteController = require("../Controllers/quote_controller");
const SendyController = require("../Controllers/sendy_controller");
const ClaimController = require("../Controllers/claim_controller");

//policy controllers ; well the ones i moved
const SalamahTransitionController = require("../Controllers/PolicyControllers/salamah_policy_controller");
const TravelPolicyController = require("../Controllers/PolicyControllers/travel_policy_controller");
//move all storage functions to different files
const path = require("path");

const multer = require("multer");

const claimDocsStorage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./documentsStorage/claimsDocuments");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var uploadClaimDocs = multer({
  storage: claimDocsStorage,
  limits: { fileSize: 1000000 }
});

module.exports = app => {
  /**
   * @swagger
   * /:
   *  get:
   *    description: Use to request all customers
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.route("/").get((req, res) => {
    res.send("Welcome to Nsure");
  });

  /**
   * @swagger
   * /signin:
   *  get:
   *    description: Use to request all customers
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.route("/signin").post(UserController.signin);

  /**
   * @swagger
   * /signin:
   *  post:
   *    description: Use to request all customers
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.route("/signup").post(UserController.signup);

  // All policies
  app.route("/policies/:userId").get(PolicyController.getAllUserPolicies);

  // Motor Policies
  app
    .route("/policies/motor/:userId")
    .get(PolicyController.getUserMotorPolicies); // requires auth
  app
    .route("/policies/motor/policy/:policyId")
    .get(PolicyController.getMotorPolicy); // requires auth
  app.route("/policies/motor/policy").post(PolicyController.createMotorPolicy); // requires auth

  // motor quote
  app.route("/quotes/motor/").post(QuoteController.getMotorQuote);
  // medical quote
  // app.route("/quotes/medical").post(QuoteController.getMedicalQuote);
  // education quote
  // app.route("quotes/education").post(QuoteController.getEducationQuote);
  // last respect quote
  // app.route("quotes/last-respect").post(QuoteController.getLastRespectQuote);

  // Medical Policies
  app
    .route("/policies/medical/:userId")
    .get(PolicyController.getUserMedicalPolicies);
  app
    .route("/policies/medical/policy/:policyId")
    .get(PolicyController.getMedicalPolicy);
  app
    .route("/policies/medical/policy")
    .post(PolicyController.createMedicalPolicy);

  // Education Policies
  app
    .route("/policies/education/:userId")
    .get(PolicyController.getUserEducationPolicies);
  app
    .route("/policies/education/policy/:policyId")
    .get(PolicyController.getEducationPolicy);
  app
    .route("/policies/education/policy")
    .post(PolicyController.createEducationPolicy);

  // Salamah Transition Policies
  app
    .route("/policies/salamahTransition/:userId")
    .get(SalamahTransitionController.getUserSalamahTransitionPolicies);

  app
    .route("/policies/salamahTransition/:policyId")
    .get(SalamahTransitionController.getSalamahTransitionPolicy);

  app
    .route("/policies/salamahTransition/policy")
    .post(SalamahTransitionController.createSalamahTransitionPolicy);

  //Travel policy routes
  app
    .route("/policies/travel/:userId")
    .get(TravelPolicyController.getUserTravelPolicy);
  app
    .route("/policies/travel/:policyId")
    .get(TravelPolicyController.getTravelPolicy);
  app
    .route("/policies/travel/policy")
    .post(TravelPolicyController.createTravelPolicy);
  // Sendy
  app.route("/sendy/requestDelivery").post(SendyController.requestDelivery);

  app.route("/sendy/completeDelivery").post(SendyController.completeDelivery);

  app.route("/sendy/trackDelivery").post(SendyController.trackDelivery);

  app.route("/sendy/cancelDelivery").post(SendyController.cancelDelivery);

  //policy types
  app.post("/createPolicyType", PolicyController.createPolicy);

  // Claims
  app.post(
    "/createClaim",
    uploadClaimDocs.fields([
      { name: "claimPhotos", maxCount: 5 },
      { name: "claimDocs", maxCount: 5 }
    ]),
    ClaimController.uploadClaim
  );

  app.get("/getClaim", ClaimController.getClaim);
  app.get("/getUserClaims", ClaimController.getUserClaims);
};

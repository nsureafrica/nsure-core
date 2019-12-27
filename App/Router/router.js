// @ts-check

const UserController = require("../Controllers/user_controller");
const PolicyController = require("../Controllers/policy_controller");
const QuoteController = require("../Controllers/quote_controller");

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

  //Motor Policies
  const motorPolicyRoutes = require("./PolicyRoutes/motor_policy_routes");
  motorPolicyRoutes(app);
  // motor quote
  app.route("/quotes/motor/").post(QuoteController.getMotorQuote);
  // medical quote
  // app.route("/quotes/medical").post(QuoteController.getMedicalQuote);
  // education quote
  // app.route("quotes/education").post(QuoteController.getEducationQuote);
  // last respect quote
  // app.route("quotes/last-respect").post(QuoteController.getLastRespectQuote);

  // Medical Policies
  const medicalPolicyRoutes = require("./PolicyRoutes/medical_policy_routes");
  medicalPolicyRoutes(app);

  // Education Policies
  const educationPolicyRoutes = require("./PolicyRoutes/education_policy_routes");
  educationPolicyRoutes(app);

  // Salamah Transition Policies
  const salamahTransitionPolicyRoutes = require("./PolicyRoutes/salamah_policy_routes");
  salamahTransitionPolicyRoutes(app);

  //Travel policy routes
  const travelPolicyRourtes = require("./PolicyRoutes/travel_policy_routes");
  travelPolicyRourtes(app);

  // Sendy Routes
  const sendyRoutes = require("./sendy_routes");
  sendyRoutes(app);
  //policy types
  app.post("/createPolicyType", PolicyController.createPolicy);

  // Download Routes
  const downloadRoutes = require("./downloadRoutes/download_routes");
  downloadRoutes(app);
  // Claims
  const claimRoutes = require("./claimRoutes");
  claimRoutes(app);
};

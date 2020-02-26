// @ts-check

const UserController = require("../Controllers/user_controller");
const PolicyController = require("../Controllers/policy_controller");

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

  app.route("/forgotPassword").put(UserController.forgotPassword);

  app.route("/changePassword").post(UserController.changePassword);
  //Motor Policies
  const motorPolicyRoutes = require("./PolicyRoutes/motor_policy_routes");
  motorPolicyRoutes(app);

  //Quotes
  const quotesRoutes = require("./QuoteRoutes/quoteRoutes")
  quotesRoutes(app);

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
  app.route("/companyPolicies").get(PolicyController.getPolicies);

  // Download Routes
  const downloadRoutes = require("./downloadRoutes/download_routes");
  downloadRoutes(app);
  // Claims
  const claimRoutes = require("./claimRoutes");
  claimRoutes(app);

  // underwriter routes
  const underwriterRoutes = require("./underwritter_routes")
  underwriterRoutes(app)
  
  //motor class routes
  const motorClassRoutes = require('./PolicyRoutes/Motor/motor_class_routes')
  motorClassRoutes(app)

  // motor rates routes
  const motorRatesRoutes = require("./PolicyRoutes/Motor/motor_rates_routes")
  motorRatesRoutes(app)

  // medical rates routes
  const medicalRatesRoutes = require("./RateRoutes/medical_rates_routes")
  medicalRatesRoutes(app)

  //medical plans routes
  const medicalPlansRoutes = require("./RateRoutes/medical_plans_routes")
  medicalPlansRoutes(app)

  //send mail routes
  const sendMailRoutes = require("./MailRoutes/send_mail_routes")
  sendMailRoutes(app)
};

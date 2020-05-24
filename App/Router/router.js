// @ts-check

const UserController = require("../Controllers/user_controller");
const PolicyController = require("../Controllers/policy_controller");

module.exports = (app) => {
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

  app.route("/verifyUser").get(UserController.verifyUser);
  //Motor Policies
  const motorPolicyRoutes = require("./PolicyRoutes/motor_policy_routes");
  motorPolicyRoutes(app);

  //Quotes
  const quotesRoutes = require("./QuoteRoutes/quoteRoutes");
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

  //TRAVEL POLICY
  //Travel policy routes
  const travelPolicyRoutes = require("./PolicyRoutes/travel_policy_routes");
  travelPolicyRoutes(app);

  const travelRateRoutes = require("./TravelPolicyRoutes/travel_rate_routes")
  travelRateRoutes(app)

  //Travel Plan Routes
  const travelPlanRoutes = require("./TravelPolicyRoutes/travel_plan_routes")
  travelPlanRoutes(app)
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
  const underwriterRoutes = require("./underwritter_routes");
  underwriterRoutes(app);

  //motor class routes
  const motorClassRoutes = require("./PolicyRoutes/Motor/motor_class_routes");
  motorClassRoutes(app);

  // motor rates routes
  const motorRatesRoutes = require("./RateRoutes/motor_rates_routes");
  motorRatesRoutes(app);

  // medical rates routes
  const medicalRatesRoutes = require("./RateRoutes/medical_rates_routes");
  medicalRatesRoutes(app);

  //Motor tonnage rates routes
  const motorTonnageRatesRoutes = require("./RateRoutes/motor_tonnage_rate_routes");
  motorTonnageRatesRoutes(app);

  //medical plans routes
  const medicalPlansRoutes = require("./PlanRoutes/medical_plans_routes");
  medicalPlansRoutes(app);

  //send mail routes
  const sendMailRoutes = require("./MailRoutes/send_mail_routes");
  sendMailRoutes(app);

  //user category routes
  const userCategoryRoutes = require("./UserRoutes/user_category_routes");
  userCategoryRoutes(app);

  //Transactions Routes
  const transactionRoutes = require("./TransactionRoutes/Transaction_routes");
  transactionRoutes(app);

  //Bill routes
  const billRoutes = require("./TransactionRoutes/Bill_Routes");
  billRoutes(app);

  //last expense rate routes
  const lastExpenseRateRoutes = require("./RateRoutes/last_expense_rate_routes");
  lastExpenseRateRoutes(app);

  //last expense plan routes
  const lastExpensePlanRoutes = require("./PlanRoutes/last_expense_plan_routes");
  lastExpensePlanRoutes(app);

  //last expense policy routes
  const lastExpensePolicyRoutes = require("./PolicyRoutes/last_expense_policy_routes");
  lastExpensePolicyRoutes(app);

  //domestic policy routes
  const domesticPolicyRoutes = require("./DomesticPolicyRoutes/domestic_policy_routes");
  domesticPolicyRoutes(app)

  //domestic policy plan routes
  const domesticPolicyPlanRoutes = require("./DomesticPolicyRoutes/domestic_policy_plans_routes");
  domesticPolicyPlanRoutes(app)
  //dashboard routes
  const dashboardRoutes = require("./DashboardRoutes/dashboard_routes");
  dashboardRoutes(app);

  //BUSINESS COMBINED
  //business combined routes
  const businessCombinedClassesRoutes = require("./BusinessCombinedRoutes/business_combined_classes_routes")
  businessCombinedClassesRoutes(app)
  const businessCombinedConditionsRoutes = require("./BusinessCombinedRoutes/business_combined_conditions_routes")
  businessCombinedConditionsRoutes(app)
  const businessCombinedPolicyRoutes = require("./BusinessCombinedRoutes/business_combined_policy_routes")
  businessCombinedPolicyRoutes(app)

  //AUDIT LOGS
  const auditLogsRoutes = require("./AuditLogRoutes/audit_log_routes")
  auditLogsRoutes(app)

  //CONVERSION RATES
  const conversionRateRoutes = require("./ConversionRateRoutes/conversion_rate_routes")
  conversionRateRoutes(app)
};

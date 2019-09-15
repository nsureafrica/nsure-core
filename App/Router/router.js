const UserController = require("../Controllers/user_controller");
const PolicyController = require("../Controllers/policy_controller");

module.exports = app => {
  app.route("/").get((req, res) => {
    res.send("Welcome to bussly");
  });
  app.route("/signin").post(UserController.signin);
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
};

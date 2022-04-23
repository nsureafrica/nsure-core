//@ts-check

const UserCategoryController = require("./../../Controllers/UserControllers/user_category_controller");
module.exports = app => {
  app.post("/api/usercategory/createCategory", UserCategoryController.createCategory);
};

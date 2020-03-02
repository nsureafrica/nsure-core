//@ts-check
const CategoryModel = require("./../../Models/UserCategory");
module.exports = {
  createCategory: (req, res) => {
    CategoryModel.create(req.body)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getAllCategories:()=>{}
};

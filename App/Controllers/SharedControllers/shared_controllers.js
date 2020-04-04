//@ts-check

const Bill = require("./../../Models/Bill");
const transporter = require("../../Utils/mailService");
module.exports = {
  //get all policies
  //get all by user id

  getAllPolicies: (req, res, model) => {
    model
      .findAll({
        order: [["updatedAt", "DESC"]],
        include: [Bill]
      })
      .then(policies => {
        res.status(200).send(policies);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  // get one policy by policyId

  getOnePolicyById: (req, res, model) => {
    model
      .findAll({
        order: [["updatedAt", "DESC"]],
        where: {
          id: req.params.policyId
        },
        include: [Bill]
      })
      .then(policies => {
        res.status(200).send(policies);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },

  getAllPoliciesByUserId: (req, res, model) => {
    model
      .findAll({
        order: [["updatedAt", "DESC"]],
        include: [Bill],
        where: {
          UserId: req.user.id
        }
      })
      .then(polciies => {
        res.status(200).send(polciies);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  },
  createPolicy: (req, res, model,mailOptions) => {
    Bill.create({
      amount: req.body.quoteAmount
    }).then(billResponse => {
      const billId = { BillId: billResponse.dataValues.id };
      const UserId = { UserId: req.user.id };
      Object.assign(req.body, UserId);
      Object.assign(req.body, billId);
      model
        .create(req.body)
        .then(response => {
          console.log(response);
          res.status(200).send(response);
          // transporter.transporter.sendMail(mailOptions, (err, info) => {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     const notice = `Email sent: ` + info.response;
          //     console.log(notice);
          //   }
          // });
        })
        .catch(err => {
          res.status(500).send(err);
        });
    });
  },
  updateEntryById: (req, res, model) => {
    model
      .update(req.body, {where: { id: req.params.id } })
      .then(response => {
        console.log(response)
        res.status(200).send(response);
      })
      .catch(err => res.status(500).send(err));
  },

  activatePolicy: (req, res ,model) => {
    const UserId = { activatedBy: req.user.id };
    const policyId = req.body.id
    Object.assign(req.body, UserId);
    delete req.body.id
    if ((req.user.UserCategoryId === 2)) {
      model.update(req.body, {where: {id: policyId}})
      .then(response => {
        console.log(response)
        res.status(200).send({message:"Policy Activated Successfully"})
      })
      .catch(err => {
        console.error(err)
        res.send(err)
      })
    }else{
      res
      .status(401)
      .send({
        message: "You need to be an administrator to activate policies"
      });
    }


  }
};

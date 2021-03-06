//@ts-check

const Bill = require("./../../Models/Bill");
const User = require("./../../Models/User");
const transporter = require("../../Utils/mailService");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _ = require("lodash");
const ExportToCsv = require("export-to-csv").ExportToCsv;
module.exports = {
  //get all policies
  //get all by user id

  getAllPolicies: (req, res, model) => {
    var whereObject = {};
    //Date Search
    if (req.query.startDate && req.query.endDate) {
      var dateQuery = {
        createdAt: {
          [Op.between]: [req.query.startDate, req.query.endDate],
        },
      };
      Object.assign(whereObject, dateQuery);
    }

    console.log(whereObject);
    model
      .findAll({
        order: [["updatedAt", "DESC"]],
        include: [Bill, User],
        where: whereObject,
      })
      .then((policies) => {
        res.status(200).send(policies);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  // get one policy by policyId

  getOnePolicyById: (req, res, model) => {
    model
      .findAll({
        order: [["updatedAt", "DESC"]],
        where: {
          id: req.params.policyId,
        },
        include: [Bill],
      })
      .then((policies) => {
        res.status(200).send(policies);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  getAllPoliciesByUserId: (req, res, model) => {
    model
      .findAll({
        order: [["updatedAt", "DESC"]],
        include: [Bill],
        where: {
          UserId: req.user.id,
        },
      })
      .then((polciies) => {
        res.status(200).send(polciies);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  createPolicy: (req, res, model, mailOptions) => {
    Bill.create({
      amount: req.body.quoteAmount,
    }).then((billResponse) => {
      const billId = { BillId: billResponse.dataValues.id };
      const UserId = { UserId: req.user.id };
      Object.assign(req.body, UserId);
      Object.assign(req.body, billId);
      model
        .create(req.body)
        .then((response) => {
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
        .catch((err) => {
          res.status(500).send(err);
        });
    });
  },
  updateEntryById: (req, res, model) => {
    model
      .update(req.body, { where: { id: req.params.id } })
      .then((response) => {
        console.log(response);
        res.status(200).send(response);
      })
      .catch((err) => res.status(500).send(err));
  },

  activatePolicy: (req, res, model) => {
    const UserId = { activatedBy: req.user.id };
    const policyId = req.body.id;
    Object.assign(req.body, UserId);
    delete req.body.id;
    if (req.user.UserCategoryId === 2) {
      model
        .update(req.body, { where: { id: policyId } })
        .then((response) => {
          console.log(response);
          res.status(200).send({ message: "Policy Activated Successfully" });
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
    } else {
      res.status(401).send({
        message: "You need to be an administrator to activate policies",
      });
    }
  },
  exportDataAsCsv: async (req, res, model) => {
    try {
      const policies = await model.findAll({
        order: [["updatedAt", "DESC"]],
      });

      const data = [];
      policies.map((policy) => {
        data.push(policy.dataValues);
      });
      const header =
        Object.keys(data[0])
          .map((_) => JSON.stringify(_))
          .join(",") + "\n";
      const outData = data.reduce((acc, row) => {
        return (
          acc +
          Object.values(row)
            .map((_) => JSON.stringify(_).replace(/,/g, "|"))
            .join(",") +
          "\n"
        );
      }, header);

      // CSV Specification
      //www.ietf.org/rfc/rfc4180.txt

      http: res.setHeader("Content-Type", "text/csv");
      res.write(outData);
      res.end();
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }
  },
};

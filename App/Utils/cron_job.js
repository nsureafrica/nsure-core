//@ts-check

var CronJob = require("cron").CronJob;
const { Op } = require("sequelize");

//this is the file that will check on a daily for expired polices
var job = new CronJob(
  "* * * * * * ",
  function() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getFullYear() + 1);

    // console.log(tomorrow);
  },
  null,
  true,
  "Africa/Nairobi"
);
job.start();


// Motor Policies job


const MotorPoliciesModel = require("./../Models/motor_policy")
var motorPolicesJob = new CronJob(
    "30 9 * * *",
    () => {
        var nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1)
        MotorPoliciesModel.findAll({
            where: {
                createdAt: {
                    [Op.gt]: nextYear.toISOString()
                  }
            }
          })
            .then(policies => {
                console.log(policies[0].dataValues.emailAddress)
            })
            .catch(err => {
                console.log(err)
            });
        },
   
)

motorPolicesJob.start()
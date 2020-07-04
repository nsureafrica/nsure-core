//@ts-check
const InvoiceTemplates = require("../../email_templates/invoicetemplate");
const Transporter = require("../../Utils/mailService");
const pdf = require("./../../email_templates/business_quote_pdf");
const _ = require("lodash");
const e = require("express");
module.exports = {
  getQuote: async (req, res) => {
    try {
      var fireAndPerilsBuildingsValue = req.body.fireAndPerilsBuildingsValue;
      var fireAndPerilsContentsValue = req.body.fireAndPerilsContentsValue;
      var electronicComputersValue = req.body.electronicComputersValue;
      var allRisksForComputersValue = req.body.allRisksForComputersValue;
      var cashiersValue = req.body.cashiersValue;
      var salesPersonValue = req.body.salesPersonValue;
      var perCapitaValue = req.body.perCapitaValue;
      var moneyInTransitValue = req.body.moneyInTransitValue;
      var moneyInPremisesValue = req.body.moneyInPremisesValue;
      var lockedSafeBusinessHoursValue = req.body.lockedSafeBusinessHoursValue;
      var lockedSafeOutsideSafeBusinessHoursValue =
        req.body.lockedSafeOutsideSafeBusinessHoursValue;
      var cashValue = req.body.cashValue;
      var damageToSafeValue = req.body.damageToSafeValue;
      var estAnnualCarryValue = req.body.estAnnualCarryValue;

      var materialDamageValue = req.body.materialDamageValue;
      var moneyValue = req.body.moneyValue;
      var burglaryItemsValue = req.body.burglaryItemsValue;
      var occurrenceValue = req.body.occurrenceValue;
      var periodOfInsuranceValue = req.body.periodOfInsuranceValue;

      var stampDuty = 40;
      function calculateLevies(value) {

        var levies = _.multiply(value, 0.0045)
        return _.round(levies, 2);
      }

      async function calculateQuoteAmount(totalAmounts) {
        quoteAmount = 0;
        totalAmounts.map((value) => {
          if (value != null || value != undefined) {
            quoteAmount = _.add(quoteAmount, parseFloat(value));
          }
        });
        return _.round(quoteAmount, 0);
      }

      async function calculateTotalAmount(amounts) {
        var totalAmount = 0;
        amounts.map((value) => {
          if (value != null) {
            totalAmount = _.add(totalAmount, parseFloat(value));
          }
        });
        return totalAmount;
      }

      function calculateTotalValue(values) {
        var totalValue = 0
        values.map((value) => {
          totalValue = _.add(totalValue, value)
        })
        return _.round(totalValue,2)
      }



      //FIRE AND PERILS
      var fireAndPerilsObject = null;
      if (fireAndPerilsBuildingsValue || fireAndPerilsContentsValue) {
        var additionOfValues = await calculateTotalAmount([
          fireAndPerilsBuildingsValue,
          fireAndPerilsContentsValue,
        ]);
        var basicPremium = _.round(_.multiply(additionOfValues, 0.001), 2);
        var levies = calculateLevies(basicPremium);
        var totalValue = calculateTotalValue([basicPremium, levies, stampDuty]);
        fireAndPerilsObject = {
          basicPremium: basicPremium,
          levies: levies,
          stampDuty: stampDuty,
          totalValue: totalValue,
        };
      }
      //ELECTRONIC COMPUTER POLICY
      var electronicComputersPolicyObject = null;
      if (electronicComputersValue) {
        var basicPremium = _.round(_.multiply(electronicComputersValue, _.divide(1.5, 100)), 2);
        var levies = calculateLevies(basicPremium);
        var totalValue = calculateTotalValue([basicPremium,levies,stampDuty]);
        electronicComputersPolicyObject = {
          basicPremium: basicPremium,
          levies: levies,
          stampDuty: stampDuty,
          totalValue: totalValue,
        };

        //ALL RISKS FOR COMPUTERS
        var allRisksForComputersObject = null;
        if (allRisksForComputersValue) {
          var basicPremium = _.multiply(allRisksForComputersValue, _.divide(1.5, 100));
          var levies = calculateLevies(basicPremium);
          var totalValue =calculateTotalValue([ basicPremium , levies , stampDuty]);
          allRisksForComputersObject = {
            basicPremium: basicPremium,
            levies: levies,
            stampDuty: stampDuty,
            totalValue: totalValue,
          };
        }

        //FIDELTY GUARANTEE
        var fidelityGuaranteeObject = null;
        if (cashiersValue || salesPersonValue || perCapitaValue) {
          var additionOfValues = await calculateTotalAmount([
            cashiersValue,
            salesPersonValue,
          ]);
          var basicPremium = _.multiply(additionOfValues, _.divide(3.5, 100));
          var levies = calculateLevies(basicPremium);
          var totalValue = calculateTotalValue([basicPremium , levies , stampDuty]);
          fidelityGuaranteeObject = {
            basicPremium: basicPremium,
            levies: levies,
            stampDuty: stampDuty,
            totalValue: totalValue,
          };
        }

        //MONEY!
        var moneyObject = null;
        if (
          moneyInTransitValue ||
          moneyInPremisesValue ||
          lockedSafeBusinessHoursValue ||
          lockedSafeOutsideSafeBusinessHoursValue ||
          cashValue ||
          damageToSafeValue ||
          estAnnualCarryValue
        ) {
          var additionOfValues = await calculateTotalAmount([
            moneyInTransitValue,
            moneyInPremisesValue,
            lockedSafeBusinessHoursValue,
            lockedSafeOutsideSafeBusinessHoursValue,
            cashValue,
            damageToSafeValue,
            estAnnualCarryValue,
          ]);
          var basicPremium = _.multiply(additionOfValues, _.divide(0.1, 100));
          var levies = calculateLevies(basicPremium);
          var totalValue = calculateTotalValue([basicPremium , levies , stampDuty]);
          moneyObject = {
            basicPremium: basicPremium,
            levies: levies,
            stampDuty: stampDuty,
            totalValue: totalValue,
          };
        }
        //POLITICAL & TERRORISM
        var policalAndTerrorismObject = null;
        if (materialDamageValue || moneyValue) {
          var additionOfValues = await calculateTotalAmount([
            materialDamageValue,
            moneyValue,
          ]);
          var basicPremium = _.multiply(additionOfValues, _.divide(0.1, 100));
          var levies = calculateLevies(basicPremium);
          var totalValue = calculateTotalValue([basicPremium,levies,stampDuty]);
          policalAndTerrorismObject = {
            basicPremium: basicPremium,
            levies: levies,
            stampDuty: stampDuty,
            totalValue: totalValue,
          };
        }

        // BURGLARY
        var burglaryObject = null;
        if (burglaryItemsValue) {
          var basicPremium = _.multiply(burglaryItemsValue, _.divide(0.5, 100));
          var levies = calculateLevies(basicPremium);
          var totalValue = calculateTotalValue([basicPremium,levies,stampDuty]);
          burglaryObject = {
            basicPremium: basicPremium,
            levies: levies,
            stampDuty: stampDuty,
            totalValue: totalValue,
          };
        }

        // PUBLIC LIABILITY
        var publicLiabilityObject = null;
        if (occurrenceValue || periodOfInsuranceValue) {
          var additionOfValues = await calculateTotalAmount([
            periodOfInsuranceValue,
            occurrenceValue,
          ]);
          var basicPremium = _.multiply(additionOfValues, _.divide(0.1, 100));
          var levies = calculateLevies(basicPremium);
          var totalValue = calculateTotalValue([basicPremium,levies,stampDuty]);
          publicLiabilityObject = {
            basicPremium: basicPremium,
            levies: levies,
            stampDuty: stampDuty,
            totalValue: totalValue,
          };
        }
        var quoteAmount = await calculateQuoteAmount([
          fireAndPerilsObject.totalValue,
          electronicComputersPolicyObject.totalValue,
          allRisksForComputersObject.totalValue,
          fidelityGuaranteeObject.totalValue,
          moneyObject.totalValue,
          policalAndTerrorismObject.totalValue,
          burglaryObject.totalValue,
          publicLiabilityObject.totalValue,
        ]);

        var QuoteObject = {
          quoteAmount: quoteAmount,
          fireAndPerils: fireAndPerilsObject,
          electronicComputersPolicy: electronicComputersPolicyObject,
          allRisksForComputers: allRisksForComputersObject,
          fidelityGuarantee: fidelityGuaranteeObject,
          money: moneyObject,
          policalAndTerrorism: policalAndTerrorismObject,
          burglary: burglaryObject,
          publicLiability: publicLiabilityObject,
        }
        res.status(200).send(QuoteObject);
      }

      var travelQuoteEmailJson = QuoteObject;
      const userDetails = { user: req.user };
      const userInput = { userInput: req.body };
      Object.assign(travelQuoteEmailJson, userDetails);
      Object.assign(travelQuoteEmailJson, userInput);

      const policyPdfDirectory =
        "./documentsStorage/PolicyPdf/" + Date.now() + ".pdf";
      await pdf.createInvoice(
        travelQuoteEmailJson,
        policyPdfDirectory
      );

      var mailOptions = {
        from: process.env.senderEmailAdress,
        to: req.user.email,
        bcc: `${process.env.spireReceivingEmailAddress},${process.env.businessTeamEmail}`,
        subject: "Business Combined Insurance Quote",
        html: InvoiceTemplates.invoiceQuoteEmail(req),
        attachments: [
          {
            // file on disk as an attachment
            filename: "businessCombinedQuote.pdf",
            path: policyPdfDirectory, // stream this file
          },
        ],
      };

      Transporter.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          //TODO save all failed mails to a certain table to be able to run a cron job hourly that resends all the mails
          console.log(err);
        } else {
          const notice = `Email sent: ` + info.response;
        }
      });
    } catch (error) {
      console.error(error)
      res.status(500).send(error);
    }
  },
};

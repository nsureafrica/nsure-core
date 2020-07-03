//@ts-check
const InvoiceTemplates = require("../../email_templates/invoicetemplate");
const Transporter = require("../../Utils/mailService");
const pdf = require("./../../email_templates/business_quote_pdf");

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
        var levies = value * (0.45/100)
        return parseFloat(levies.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }));
      }

      async function calculateQuoteAmount(totalAmounts) {
        quoteAmount = 0;
         totalAmounts.map((value) => {
          if (value != null || value != undefined) {
            quoteAmount = quoteAmount + value.totalValue;
          }
        });
        return parseFloat(quoteAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }));
      }

      async function calculateTotalAmount(amounts) {
        var totalAmount = 0;
        amounts.map((value) => {
          if (value != null) {
            totalAmount = totalAmount + parseFloat(value);
          }
        });
        return totalAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });      }



      //FIRE AND PERILS
      var fireAndPerilsObject = null;
      if (fireAndPerilsBuildingsValue || fireAndPerilsContentsValue) {
        var additionOfValues = await calculateTotalAmount([
          fireAndPerilsBuildingsValue,
          fireAndPerilsContentsValue,
        ]);
        var basicPremium = additionOfValues * 0.001;
        var levies = calculateLevies(basicPremium);
        var totalValue = basicPremium + levies + stampDuty;
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
        var basicPremium = electronicComputersValue * (1.5 / 100);
        var levies = calculateLevies(basicPremium);
        var totalValue = basicPremium + levies + stampDuty;
        electronicComputersPolicyObject = {
          basicPremium: basicPremium,
          levies: levies,
          stampDuty: stampDuty,
          totalValue: totalValue,
        };

        //ALL RISKS FOR COMPUTERS
        var allRisksForComputersObject = null;
        if (allRisksForComputersValue) {
          var basicPremium = allRisksForComputersValue * (1.5 / 100);
          var levies = calculateLevies(basicPremium);
          var totalValue = basicPremium + levies + stampDuty;
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
          var basicPremium = additionOfValues * (3.5 / 100);
          var levies = calculateLevies(basicPremium);
          var totalValue = basicPremium + levies + stampDuty;
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
          var basicPremium = additionOfValues * (0.1 / 100);
          var levies = calculateLevies(basicPremium);
          var totalValue = basicPremium + levies + stampDuty;
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
          var basicPremium = additionOfValues * (0.1 / 100);
          var levies = calculateLevies(basicPremium);
          var totalValue = basicPremium + levies + stampDuty;
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
          var basicPremium = burglaryItemsValue * (0.5 / 100);
          var levies = calculateLevies(basicPremium);
          var totalValue = basicPremium + levies + stampDuty;
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
          var basicPremium = additionOfValues * (0.1 / 100);
          var levies = calculateLevies(basicPremium);
          var totalValue = basicPremium + levies + stampDuty;
          publicLiabilityObject = {
            basicPremium: basicPremium,
            levies: levies,
            stampDuty: stampDuty,
            totalValue: totalValue,
          };
        }
        var quoteAmount = await calculateQuoteAmount([
          fireAndPerilsObject,
          electronicComputersPolicyObject,
          allRisksForComputersObject,
          fidelityGuaranteeObject,
          moneyObject,
          policalAndTerrorismObject,
          burglaryObject,
          publicLiabilityObject,
        ]);
        res.status(200).send({
          quoteAmount: quoteAmount,
          fireAndPerils: fireAndPerilsObject,
          electronicComputersPolicy: electronicComputersPolicyObject,
          allRisksForComputers: allRisksForComputersObject,
          fidelityGuarantee: fidelityGuaranteeObject,
          money: moneyObject,
          policalAndTerrorism: policalAndTerrorismObject,
          burglary: burglaryObject,
          publicLiability: publicLiabilityObject,
        });
      }

      // var travelQuoteEmailJson = TravelPolicy.dataValues;
      // const userDetails = { user: req.user };
      // const userInput = { userInput: QuoteObject };
      // Object.assign(travelQuoteEmailJson, userDetails);
      // Object.assign(travelQuoteEmailJson, userInput);

      // const policyPdfDirectory =
      //   "./documentsStorage/PolicyPdf/" + Date.now() + ".pdf";
      // await pdf.createInvoice(
      //   travelQuoteEmailJson,
      //   policyPdfDirectory
      // );
      
      var mailOptions = {
        from: process.env.senderEmailAdress,
        to: req.user.email,
        bcc: `${process.env.spireReceivingEmailAddress},${process.env.businessTeamEmail}`,
        subject: "Business Combined Insurance Quote",
        html: InvoiceTemplates.invoiceQuoteEmail(req),
        // attachments: [
        //   {
        //     // file on disk as an attachment
        //     filename: "businessCombinedQuote.pdf",
        //     path: policyPdfDirectory, // stream this file
        //   },
        // ],
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
      res.status(500).send(error);
    }
  },
};

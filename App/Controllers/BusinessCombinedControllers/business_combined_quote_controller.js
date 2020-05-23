//@ts-check

module.exports = {
  getQuote: (req, res) => {
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
        return value * (0.45 / 100);
      }

      function calculateQuoteAmount(totalAmounts) {
        quoteAmount = 0;
        totalAmounts.map((value) => {
          if (value != null) {
            quoteAmount = quoteAmount + value.totalValue;
          }
        });
        return quoteAmount;
      }

      function calculateTotalAmount(amounts) {
        var totalAmount = 0;
        amounts.map((value) => {
          if (value != null) {
            totalAmount = totalAmount + parseFloat(value);
          }
        });
        return totalAmount;
      }
      //FIRE AND PERILS
      var fireAndPerilsObject = null;
      if (fireAndPerilsBuildingsValue || fireAndPerilsContentsValue) {
        var additionOfValues = calculateTotalAmount([
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
          var additionOfValues = calculateTotalAmount([
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
          var additionOfValues = calculateTotalAmount([
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
          var additionOfValues = calculateTotalAmount([
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
          var additionOfValues = calculateTotalAmount([
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
        var quoteAmount = calculateQuoteAmount([
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
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

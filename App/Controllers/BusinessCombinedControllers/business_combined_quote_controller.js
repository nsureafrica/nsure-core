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
      //FIRE AND PERILS
      var fireAndPerilsObject = null;
      if (fireAndPerilsBuildingsValue || fireAndPerilsContentsValue) {
        var basicPremium =
          (fireAndPerilsBuildingsValue + fireAndPerilsContentsValue) * 0.001;
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
          var basicPremium = (cashiersValue + salesPersonValue) * (3.5 / 100);
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
          var basicPremium =
            (moneyInTransitValue +
              moneyInPremisesValue +
              lockedSafeBusinessHoursValue +
              lockedSafeOutsideSafeBusinessHoursValue +
              cashValue +
              damageToSafeValue +
              estAnnualCarryValue) *
            (0.1 / 100);
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
          var basicPremium = (materialDamageValue + moneyValue) * (0.1 / 100);
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
          var basicPremium =
            (periodOfInsuranceValue + occurrenceValue) * (0.1 / 100);
          var levies = calculateLevies(basicPremium);
          var totalValue = basicPremium + levies + stampDuty;
          publicLiabilityObject = {
            basicPremium: basicPremium,
            levies: levies,
            stampDuty: stampDuty,
            totalValue: totalValue,
          };
        }
        var quoteAmount = fireAndPerilsObject.totalValue + electronicComputersPolicyObject.totalValue + allRisksForComputersObject.totalValue + fidelityGuaranteeObject.totalValue + moneyObject.totalValue + policalAndTerrorismObject.totalValue + burglaryObject.totalValue + publicLiabilityObject.totalValue;
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

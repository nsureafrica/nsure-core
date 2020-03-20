//@ts-check

//all put requests will be here
//all controllers grouped by here

module.exports = {

    getGroupedByFieldRates: (req,res,field,model)=>{
        model.findAll({})
        .then(rates => {
          var outObject = rates.reduce(function(a, e) {
            let estKey = (e[field]);         
            (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
            return a;
          }, {});
          res.status(200).send(outObject);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    },
    getRateByPlanId: (req,res,model) => {
      model.findOne({
        where: {
          id: req.params.id
        }
      }).then(rate => {
        res.status(200).send(rate)
      })
    }
}
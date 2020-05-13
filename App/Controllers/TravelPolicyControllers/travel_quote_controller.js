//@ts-check

//wintersports
//age

module.exports = {
  getMedicalQuote: (req, res) => {
    try {
      const winterSports = false;
      const age = 17;
      const schengenCountries = ["AUT","BEL","CZE","DNK","EST","FIN","FRA","DEU","GRC","HUN","ISL","ITA","LVA","LIE","LTU","LUX","MLT","NLD","NOR","POL","PRT","SVK","SVN","ESP","SWE","CHE"]

      // check max age 
      if (age > 85) {
          throw new Error("too old mate")
      }

      //get rates and loop to find appropriate
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

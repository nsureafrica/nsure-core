//@ts-check

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "NSURE API",
      description: "NSURE API Information",
      contact: {
        name: "Allan Mageto"
      },
      servers: ["http://localhost:8080"]
    }
  },
  // ['.routes/*.js']
  apis: ["App/Router/router.js"]
};

// @ts-ignore
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = app => {
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

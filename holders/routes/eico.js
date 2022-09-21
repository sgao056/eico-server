module.exports = app => {
  const eico = require("../controllers/eico.controller.js");

  var router = require("express").Router();

  // Retrieve all Eicos
  router.get("/holders", eico.findAll);

  // Create a new Eico
  router.post("/holders", eico.create);

  // Retrieve all published Eicos
  // router.get("/published", eico.findAllPublished);

  // Retrieve a single Eico with id
  router.get("/holders/:id", eico.findOne);

  // Update a Eico with id
  router.put("/holders/:id", eico.update);

  // Delete a Eico with id
  router.delete("/holders/:id", eico.delete);

  // Delete all Eicos
  router.delete("/holders/", eico.deleteAll);

  app.use('/api/eico', router);
};

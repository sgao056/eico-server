module.exports = app => {
  const eico = require("../controllers/eico.controller.js");

  var router = require("express").Router();

  // Create a new Eico
  router.post("/holders", eico.create);

  // Update a Eico with id
  router.put("/holders/:id", eico.update);

  // Delete a Eico with id
  router.delete("/holders/:id", eico.delete);

  // Delete all Eicos
  router.delete("/holders/", eico.deleteAll);

  app.use('/', router);
};
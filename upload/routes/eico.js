module.exports = app => {
  const eico = require("../controllers/eico.controller.js");

  var router = require("express").Router();

  // Create a new Eico
  router.post("/upload", eico.create);

  // Retrieve all Eicos
  router.get("/upload", eico.findAll);

  // Retrieve all published Eicos
  // router.get("/published", eico.findAllPublished);

  // Retrieve a single Eico with id
  router.get("/upload/:id", eico.findOne);

  // Update a Eico with id
  router.put("/upload/:id", eico.update);

  // Delete a Eico with id
  router.delete("/upload/:id", eico.delete);

  // Delete all Eicos
  router.delete("/upload/", eico.deleteAll);

  app.use('/api/eico', router);
};
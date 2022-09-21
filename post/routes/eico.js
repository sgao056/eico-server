module.exports = app => {
  const eico = require("../controllers/eico.controller.js");

  var router = require("express").Router();

  // Create a new Eico
  router.post("/post", eico.create);

  // Retrieve all Eicos
  router.get("/post", eico.findAll);

  // Retrieve all published Eicos
  // router.get("/published", eico.findAllPublished);

  // Retrieve a single Eico with id
  router.get("/post/:id", eico.findOne);

  // Update a Eico with id
  router.put("/post/:id", eico.update);

  // Delete a Eico with id
  router.delete("/post/:id", eico.delete);

  // Delete all Eicos
  router.delete("/post/", eico.deleteAll);

  app.use('/api/eico', router);
};
module.exports = app => {
  const eico = require("../controllers/eico.controller.js");

  var router = require("express").Router();

  // Retrieve all Eicos
  router.get("/holders", eico.findAll);

  // Retrieve a single Eico with id
  router.get("/holders/:id", eico.findOne);

  app.use('/', router);
};

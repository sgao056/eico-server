module.exports = app => {
  const eico = require("../controllers/eico.controller.js");

  var router = require("express").Router();

  router.get("/post", eico.findAll);

  router.get("/post/:id", eico.findOne);
  
  app.use('/', router);
};
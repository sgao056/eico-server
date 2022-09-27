module.exports = app => {
  const eico = require("../controllers/eico.controller.js");

  var router = require("express").Router();

  router.post("/post", eico.create);

  router.get("/post", eico.findAll);

  router.get("/post/:id", eico.findOne);

  router.put("/post/:id", eico.update);

  router.delete("/post/:id", eico.delete);

  router.delete("/post/", eico.deleteAll);

  app.use('/', router);
};
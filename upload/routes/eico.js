const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.post("/uploadVideo", controller.uploadVideo);
  router.post("/uploadImage", controller.uploadImage);
  router.get("/files", controller.getListFiles);
  router.get("/files/:id", controller.getFile);
  router.delete("/files/:id", controller.removeById);
  router.delete("/files/:id", controller.removeByBlog);

  app.use(router);
};

module.exports = routes;

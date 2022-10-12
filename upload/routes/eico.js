const wallet = require('../../server.js')
const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  const authOwner = (req, res, next) => {
    const ownerArray = ["0x76706509011690812516c8a31fb1d9d2a38fbd9c"]
    if(ownerArray.indexOf(wallet.wallet) !== -1){
      next();
    }
    else{
      res.status(403).send('You are not authorized to do so!')
    }
  }

  router.post("/uploadVideo",authOwner, controller.uploadVideo);
  router.post("/uploadImage",authOwner, controller.uploadImage);
  router.get("/download/:name",authOwner, controller.download);
  router.get("/files",authOwner, controller.getListFiles);
  router.get("/files/:id",authOwner, controller.getFile);
  router.delete("/files/:id",authOwner, controller.removeById);
  router.delete("/files/blog/:postId",authOwner, controller.removeByBlog);
  app.use(router);
};

module.exports = routes;

const wallet = require('../../server.js')
const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();
const controller = require("../controller/file.controller");
const ownerArray = ["0x76706509011690812516c8a31fb1d9d2a38fbd9c"]

let routes = (app) => {
  const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, "mySecretKey", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        req.user = user;
        if(ownerArray.indexOf(user.wallet.toLowerCase()) !== -1){
          next();
        }
        else{
          res.status(401).json("You are not authenticated!");
        }
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };

  router.post("/uploadVideo",verify, controller.uploadVideo);
  router.post("/uploadImage",verify, controller.uploadImage);
  router.get("/download/:name",verify, controller.download);
  router.get("/files",verify, controller.getListFiles);
  router.get("/files/:id",verify, controller.getFile);
  router.delete("/files/:id",verify, controller.removeById);
  router.delete("/files/blog/:postId",verify, controller.removeByBlog);
  app.use(router);
};

module.exports = routes;

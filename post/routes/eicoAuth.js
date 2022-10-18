const jwt = require('jsonwebtoken')
const ownerArray = require('../../owner').owners
module.exports = app => {
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

  const eico = require("../controllers/eico.controller.js");

  var router = require("express").Router();

  router.post("/post",verify, eico.create);

  router.put("/post/:id",verify, eico.update);

  router.delete("/post/draft",verify, eico.deleteDraft);

  router.delete("/post/:id",verify, eico.delete);

  router.delete("/post/",verify, eico.deleteAll);
  
  app.use('/', router);
};
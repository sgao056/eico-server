const jwt = require('jsonwebtoken')
module.exports = app => {
  const ownerArray = [
    "0x76706509011690812516c8a31fb1d9d2a38fbd9c",
    "0xd221734b9add3699e8cc7a790fb18ed967ba95d5",
    "0x934979e4765f3a2cce0942f5315070f59caf8687",
    "0x6d0e5b6f2b5c2f4a8bf24af09b140e4a60de3a13"
  ]
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
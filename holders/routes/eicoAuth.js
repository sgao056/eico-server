const wallet = require('../../server.js')
const jwt = require('jsonwebtoken')
module.exports = app => {
  const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, "mySecretKey", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        req.user = user;
        if(req.body.wallet.toLowerCase() === user.wallet.toLowerCase()){
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
  const verifyOwner = (req, res, next) => {
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
  // const authUser = (req, res, next) => {
  //   console.log(req.body.wallet,wallet)
  //   if(req.body.wallet === wallet.wallet){
  //     next();
  //   }
  //   else{
  //     res.status(403).send('You are not authorized to do so!')
  //   }
  // }

  // const authOwner = (req, res, next) => {
  //   const ownerArray = ["0x76706509011690812516c8a31fb1d9d2a38fbd9c"]
  //   if(ownerArray.indexOf(wallet.wallet) !== -1){
  //     next();
  //   }
  //   else{
  //     res.status(403).send('You are not authorized to do so!')
  //   }
  // }
  const eico = require("../controllers/eico.controller.js");

  var router = require("express").Router();
  // Create a new Eico
  router.post("/holders", verifyUser, eico.create);

  // Update a Eico with id
  router.put("/holders/:id", verifyUser, eico.update);

  // Delete a Eico with id
  router.delete("/holders/:id",verifyOwner, eico.delete);

  // Delete all Eicos
  router.delete("/holders/",verifyOwner, eico.deleteAll);

  app.use('/', router);
};
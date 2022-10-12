const wallet = require('../../server.js')
module.exports = app => {

  const authUser = (req, res, next) => {
    console.log(req.body.wallet,wallet)
    if(req.body.wallet === wallet.wallet){
      next();
    }
    else{
      res.status(403).send('You are not authorized to do so!')
    }
  }

  const authOwner = (req, res, next) => {
    const ownerArray = ["0x76706509011690812516c8a31fb1d9d2a38fbd9c"]
    if(ownerArray.indexOf(wallet.wallet) !== -1){
      next();
    }
    else{
      res.status(403).send('You are not authorized to do so!')
    }
  }
  const eico = require("../controllers/eico.controller.js");

  var router = require("express").Router();
  // Create a new Eico
  router.post("/holders", authUser, eico.create);

  // Update a Eico with id
  router.put("/holders/:id", authUser, eico.update);

  // Delete a Eico with id
  router.delete("/holders/:id",authOwner, eico.delete);

  // Delete all Eicos
  router.delete("/holders/",authOwner, eico.deleteAll);

  app.use('/', router);
};
const wallet = require('../../server.js')
module.exports = app => {
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

  router.post("/post",authOwner, eico.create);

  router.put("/post/:id",authOwner, eico.update);

  router.delete("/post/draft",authOwner, eico.deleteDraft);

  router.delete("/post/:id",authOwner, eico.delete);

  router.delete("/post/",authOwner, eico.deleteAll);
  
  app.use('/', router);
};
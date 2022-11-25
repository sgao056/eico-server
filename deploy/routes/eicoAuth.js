const jwt = require('jsonwebtoken')
const owners = "0x1a34b9BE6621470Cd08F09e71Ad896b59e1Dd492, 0x663c0AcA1533530AEbb03B791F0E78b050b866dD, 0x76706509011690812516c8a31fb1d9d2a38fbd9C, 0x5d85a6136F48D6726A894F52732E2Db908Be90A1, 0x000D99B7C859E3DEF8cf80993c5c1f1c55144da1, 0xD221734b9aDd3699E8cC7a790FB18ED967ba95D5"
const ownerArray = owners.split(', ');
ownerArray.forEach(item=>{
  item.toLowerCase()
})
module.exports = app => {
  const verifyOwner = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, "mySecretKey", (err, user) => {
        if (err) {
          return res.status(403).json("Token无效！");
        }
        req.user = user;
        if(ownerArray.find(cell=>user.wallet.toLowerCase() === cell.toLowerCase())){
          next();
        }
        else{
          res.status(401).json("此钱包没有权限！");
        }
      });
    } else {
      res.status(401).json("您没有权限使用此管理页！");
    }
  };
  
  const deploy = require("../controllers/deploy.controller.js");

  var router = require("express").Router();

  // Create a new Deploy
  router.post("/deploy/:id", deploy.findOne);

  // Create a new Deploy
  router.post("/deploy", verifyOwner, deploy.create);

  // Update a Deploy with id
  router.put("/deploy/:id", verifyOwner, deploy.update);

  app.use('/', router);
};
const express = require("express");
const cors = require("cors");
const path = require("path");
const Web3 = require("web3");
const jwt = require("jsonwebtoken")
const { logger } = require("ethers");

const Moralis = require("moralis").default

const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/32d847416db047318023518fc99b727c"));

var corsOptions = {
  origin: "https://eico.forging.one/"
};

global.__basedir = __dirname;

app.use(cors(corsOptions));
app.use(express.static('upload/media'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get("/", (req, res) => {
  res.send("Welcome to eico api")
});


app.post("/secret", async (req, res)=>{
  if(req.query.data && req.query.signature){
    var data = req.query.data.replace("\\n", "\n").replace("\\n", "\n"); 
    let wallet = await web3.eth.accounts.recover(data, req.query.signature)
    const accessToken = generateAccessToken({wallet});
    res.json({
      wallet,
      accessToken
    })    
  }
  else{
    res.status(403).send({massage:"Unauthorized"})
  }
})


const generateAccessToken = (user) => {
  return jwt.sign({ wallet: user.wallet }, "mySecretKey", {
    expiresIn: "3600s",
  });
};


require("./holders/routes/eicoAuth.js")(app);
require("./post/routes/eicoAuth.js")(app);
require("./upload/routes/eico.js")(app);  
require("./holders/routes/eicoUnauth.js")(app);
require("./post/routes/eicoUnauth.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

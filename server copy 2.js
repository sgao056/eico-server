const express = require("express");
const cors = require("cors");
const path = require("path");
const Web3 = require("web3");
const { logger } = require("ethers");

const Moralis = require("moralis").default

const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/32d847416db047318023518fc99b727c"));

var corsOptions = {
  origin: "http://localhost:3000"
};

global.__basedir = __dirname;

app.use(cors(corsOptions));
app.use(express.static('upload/media'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'./index.html'))
});

app.get("/secret", async (req, res)=>{

  // await Moralis.start({ apiKey:"FqPGPZIsDKU7mF8MIniFlCQTPDcb5WIPIdXEP7Rneak0QU1IVuO98AcMQQ0em98S" }).then(
  //   async ()=>{
  //     console.log(await Moralis.Auth.verify(
  //       {
  //         message: {
  //           label:"Message",
  //           type:"text",
  //           placeholder:"Message to sign!"
  //         },
  //         signature:{
  //           label:"Signature",
  //           type:"text",
  //           placeholder:"0x7d851598770874678aa16b6f8ef98f9649dc079a4e84d0e1380e137b536068d45d52ecccc974f0b659c1e6ebcf9cb5370dfb4d2a1b804fe279214511973e32681c"
  //         },
  //         network: "evm"
  //       }
  //     ))
  //   }
  // )

  // await Moralis.start({ serverUrl, appId, moralisSecret });
  // console.log(Moralis)
  // const response = await Moralis.Auth.verify({
  //   network:"goerli",
  //   message:req.query.message,
  //   signature:req.query.signature,
  // })
  // .then(res=>{
  //   console.log(res)
  //   require("./holders/routes/eicoAuth.js")(app);
  //   require("./post/routes/eicoAuth.js")(app);
  //   require("./upload/routes/eico.js")(app);  
  // })

  // let address = await web3.eth.accounts.recover("Message to sign", req.query.signature)
  // let loger = logger.info(address)
  // console.log(`address:${address}`, `signature:${req.query.signature}`)
  // console.log(loger)
  let balance = Number(await contract.methods.balanceOf(req.query.wallet,1).call())
  console.log(req.query.wallet)

  if(balance>0){
    res.send({massage:'SECRET MESSAGE'}) 
      require("./holders/routes/eicoAuth.js")(app);
      require("./post/routes/eicoAuth.js")(app);
      require("./upload/routes/eico.js")(app);  
  }
  else{
    res.send('NOT AVAILABLE')
  }
})

require("./holders/routes/eicoUnauth.js")(app);
require("./post/routes/eicoUnauth.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const ADDRESS = "0x17dBe3783451c1538C52FBbC206dE0dAE323A16c"
const ABI = [{"inputs":[],"stateMutability":"non-payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BatchNftAirDrop","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[],"name":"EICO_CONTRIBUTOR_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_recipients","type":"address[]"}],"name":"batchAirDrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"burnBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newName","type":"string"},{"internalType":"string","name":"_newSymbol","type":"string"}],"name":"setNameAndSymbol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"uri","type":"string"}],"name":"setURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]
const contract = new web3.eth.Contract(ABI, ADDRESS,{gasLimit:"2000000"})
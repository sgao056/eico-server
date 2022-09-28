const express = require("express");

const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

global.__basedir = __dirname;

app.use(cors(corsOptions));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.json({ message: "Welcome to eico's application." });
});

require("./holders/routes/eico.js")(app);
require("./post/routes/eico.js")(app);
require("./upload/routes/eico.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

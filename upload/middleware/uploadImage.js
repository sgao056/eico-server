const util = require("util");
const multer = require("multer");
const maxSize = 5 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/upload/media");
  },
  filename: (req, file, cb) => {
    console.log(req.uniqueDate)
    cb(null, `${req.uniqueDate}.jpg`);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
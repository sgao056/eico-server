const util = require("util");
const multer = require("multer");
const maxSize = 5 * 1024 * 1024;

let storage = param => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/upload/media");
  },
  filename: (req, file, cb) => {
    console.log(Date.now());
    cb(null,`${param}.jpg`);
  },
});

let uploadFile = param => multer({
  storage: storage(param),
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = (req, res, param) => util.promisify(uploadFile(param));
module.exports = uploadFileMiddleware;

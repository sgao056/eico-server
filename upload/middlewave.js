const util = require("util");
const Multer = require("multer");

let processFile = Multer({
  storage: Multer.memoryStorage()
}).single("file");

const maxSize = 5 * 1024 * 1024;

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err);

        cb(null, raw.toString("hex") + path.extname(file.originalname));
      });
    }
  })
};

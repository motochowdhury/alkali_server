const multer = require("multer");
const { userImageDir } = require("../secret");

// Setup storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userImageDir);
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

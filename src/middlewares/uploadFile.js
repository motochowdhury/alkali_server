const multer = require("multer");
const { userImageDir } = require("../secret");
const path = require("path");

// Setup storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userImageDir);
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    cb(
      null,
      "user-profile" +
        "-" +
        Date.now() +
        file.originalname.replace(file.originalname, "") +
        extName
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

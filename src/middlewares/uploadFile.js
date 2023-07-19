const multer = require("multer");
const { userImageDir, maxFileSize, fileTypes } = require("../secret");
const path = require("path");
const createError = require("http-errors");

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

// file type checking function
const checkFileTypes = (req, file, cb) => {
  const extName = path.extname(file.originalname);
  if (!extName.includes(fileTypes)) {
    return cb(createError(400, "file types not allowed"));
  }
};

const upload = multer({ storage: storage });

module.exports = upload;

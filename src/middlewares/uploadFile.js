const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const {
  USERS_IMAGE_DIR,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
} = require("../config/config");

// Setup storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, USERS_IMAGE_DIR);
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
const fileFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPES.includes(extName.substring(1))) {
    return cb(createError(400, "file types not allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;

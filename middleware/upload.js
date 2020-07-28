const path = require("path");
const multer = require("multer");
global.__basedir = __dirname;

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, __basedir + `/uploads/`);
  // },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    // console.log(ext);
    // console.log("path ", path.toNamespacedPath(file.originalname));
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  //   fileFilter: function (req, file, callback) {
  //     if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
  //       callback(null, true);
  //     } else {
  //       console.log("only jp gand png");
  //       callback(null, false);
  //     }
  //   },
  //   limits: {
  //     fileSize: 1024 * 1024 * 5,
  //   },
});

module.exports = upload;

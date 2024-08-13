const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let originalExt =
      file.originalname.split('.')[file.originalname.split('.').length - 1];
    cb(
      null,
      req.user.username + '-' + Date.now() + '.' + originalExt,
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

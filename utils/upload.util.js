const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let originalExt =
      file.originalname.split('.')[file.originalname.split('.').length - 1];
    cb(
      null,
      req.user.username + '-' + uuidv4() + '-' + Date.now() + '.' + originalExt,
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

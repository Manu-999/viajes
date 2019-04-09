const multer = require('multer');
const storage = multer.diskStorage({
  destination: (rew, file, callback) => {
    callback(null, 'server/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

module.exports = multer({ storage });


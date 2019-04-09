const router = require('express').Router();
const multer = require('../config/multer');

router.get('/', (req, res) => {
  res.send(process.env.NODE_ENV);
});

router.post('/uploads', multer.single('file'), (req, res) => {
  res.send(req.file);
});

router.use('/users', require('./users'));
router.use('/travels', require('./travels'));

module.exports = router;
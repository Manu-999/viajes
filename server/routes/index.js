const router = require('express').Router();
const multer = require('multer');

router.get('/', (req, res) => {
  res.send(process.env.NODE_ENV);
});


router.use('/users', require('./users'));
router.use('/travels', require('./travels'));

module.exports = router;
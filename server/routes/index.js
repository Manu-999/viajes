const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(process.env.NODE_ENV);
});


router.use('/users', require('./users'));

module.exports = router;
const router = require('express').Router();
const User = require('../models/User');

router.post('/', (req, res) => {
  new User(req.body).save().then(user => {
    res.send(user);
  }).catch(err => {
    res.status(400).send(err);
  });
});

router.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({
      email, password
    })

    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;


const router = require('express').Router();
const Travel = require('../models/Travel');

// Creating data

router.post('/', (req, res) => {
  try {
    new Travel(req.body).save();
    res.status(200).send(req.body);
  } catch (err) {
    (err => res.status(400).send(err.message));
  }
});

// Reading Data

router.get('/', (req, res) => {
  Travel.find().exec((err, travels) => {
    try {
      res.status(200).send(travels);
    } catch (err) {
      res.status(400).send(err.message);
    }
  })
});

// Updating data

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  Travel.findById(id)
    .then((travel) => {
      travel.updateOne(req.body);
      res.status(200).send({ message: "Viaje actualizado." })
    })
    .catch((err) => res.status(400).send(err));
});

// Deleting data

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Travel.findById(id)
    .then((travel) => {
      travel.remove();
      res.status(200).send({ message: "Viaje eliminado" })
    })
    .catch((err) => res.status(400).send(err.message));
});

module.exports = router;
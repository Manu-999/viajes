const router = require('express').Router();
const Travel = require('../models/Travel');

// Creating data
router.post('/', async (req, res) => {
  try {
    await new Travel(req.body).save();
    res.status(200).send(req.body);
  } catch (err) {
    await (err => res.status(400).send(err.message));
  }
});

// Reading Data
router.get('/', (req, res) => {
  Travel.find().exec(async (err, travels) => {
    try {
      await res.status(200).send(travels);
    } catch (err) {
      await res.status(400).send(err.message);
    }
  })
});

// Updating data
router.post('/update', (req, res) => {
  Travel.findById(req.headers._id).exec(async (err, travel) => {
    try {
      await travel.updateOne(req.body);
      res.status(200).send({ message: "Viaje actualizado." });
    } catch (err) {
      await res.status(400).send(err.message);
    }
  })
});

// Deleting data
// router.post('/delete', (req, res) => {
//   Travel.findOne(req.body).exec(async (err, travel) => {
//     try {
//       await travel.remove();
//       res.status(400).send({ message: "Viaje eliminado correctamente." });
//     } catch (err) {
//       await res.status(400).send(err.message);
//     }
//   })
// });

router.post('/:id', async (req, res) => {
  const id = req.params.id;
  Travel.findById(id).exec(async (err, travel) => {
    try {
      await travel.remove();
      res.status(200).send({ message: "Viaje eliminado" });
    } catch (err) {
      await res.status(400).send(err.message);
    }
  })
});

module.exports = router;
const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch(err => res.status(400).json(`Err: ${err}`));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
      username,
      description,
      duration,
      date,
    });

    newExercise.save()
      .then(() => res.json('Exercise added!'))
      .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = req.body.duration;
      exercise.date = req.body.date;

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//ROUTE THAT UPDATES SINGLE FIELD
// router.route('/update/:id').put((req, res) => {
//   const id = {'_id': new ObjectID(req.params.id)};
//   // $set for updating single field
//   const details = {$set: {duration: req.body.duration}};
//   console.log(details);
//
//   Exercise.findOneAndUpdate(id, details)
//     .then(() => res.json('Update successful!'))
//     .catch(err => res.status(400).json(`Error: ${err}`));
// });

module.exports = router;
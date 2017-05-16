'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// eslint-disable-next-line
const Workout = require('../models/workouts');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/workout', function(req, res) {
  mongoose.model('workout').find(function(err, workouts) {
    res.status(200).json(workouts);
    return;
  });
});

router.post('/workout', function(req, res) {
  if (!('author' in req.body) || !('body' in req.body)
        || !('date' in req.body) || !('title' in req.body)) {
    res.status(500).json('Error writing data.');
    return;
  }

  const newWorkout = new Workout(
    {
      author: req.body.author,
      body: req.body.body,
      date: req.body.date,
      title: req.body.title
    }
  );
  newWorkout.save(function(err) {
    if (err) {
      res.status(500).json('Error writing data.');
      return;
    } else {
      res.status(201).json('Success! Data written.');
      return;
    }
  });
});

router.delete('/workout', function(req, res) {
  if (!('author' in req.body) || !('body' in req.body)
        || !('date' in req.body) || !('title' in req.body)) {
    res.status(500).json('Error removing data.');
    return;
  }
  Workout.remove({
    author: req.body.author,
    body: req.body.workout,
    date: req.body.date,
    title: req.body.title
  }, function(err) {
    if (err) {
      res.status(500).json('Error removing data.');
    } else {
      res.status(201).json('Success! Data removed.');
    }
  });
});

router.post('/sms', function(req, res) {
  res.status(200).json({ message: 'sms test' });
  return;
});

module.exports = router;

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
  const workoutCandidate = req.body.Body;
  const workoutCandidateLower = workoutCandidate.toLowerCase();
  const keyword = '#cf';

  if (!workoutCandidateLower.includes(keyword)) {
    res.status(500).json('Error writing data. Text body does not include #cf keyword.');
  }

  const workoutData = workoutCandidate.split('---');
  const workoutTitle = workoutData[0].split('\n')[1];
  const workoutBody = workoutData[1].substring(1);

  const formatDate = function(date) {
      const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ];

      const day = date.getDate();
      const monthIndex = date.getMonth();

      return `${day} ${monthNames[monthIndex]},${date.toLocaleString('en-US', {timeZone: 'America/New_York'}).split(',')[1]} EST`;
  };

  const workoutDate = formatDate(new Date());

  const newWorkout = new Workout(
    {
      body: workoutBody,
      date: workoutDate,
      title: workoutTitle
    }
  );
  newWorkout.save(function(err) {
    if (err) {
      res.status(500).json('Error writing data.');
      return;
    } else {
      res.status(201).json(
        {
          message: 'Success! Data written.',
          body: workoutBody,
          date: workoutDate,
          title: workoutTitle
        }
      );
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
